/* eslint-disable max-lines */

// eslint-disable-next-line max-classes-per-file
export enum Familienstand {
    L = 'LEDIG',
    VH = 'VERHEIRATET',
    G = 'GESCHIEDEN',
    VW = 'VERWITWET',
}

export enum KundeGeschlecht {
    W = 'W',
    M = 'M',
    D = 'D',
}

export enum Interesse {
    SPORT = 'S',
    LESEN = 'L',
    REISEN = 'R',
}

export class Adresse {
    plz?: string;
    ort?: string;
    constructor(plz: string, ort: string) {
        this.plz = plz;
        this.ort = ort;
    }
}

export class Umsatz {
    betrag?: number;
    waehrung?: string;
    constructor(betrag: number, waehrung: string) {
        this.betrag = betrag;
        this.waehrung = waehrung;
    }
}
export class User {
    username?: string;
    password?: string;
    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}

/**
 * Gemeinsame Datenfelder unabh&auml;ngig, ob die Kundedaten von einem Server
 * (z.B. RESTful Web Service) oder von einem Formular kommen.
 */
export interface KundeShared {
    _id?: string | undefined;
    nachname?: string | undefined;
    email?: string | undefined;
    user?: User | undefined;
    username?: string | undefined;
    password?: string | undefined;
    adresse?: Adresse | undefined;
    ort?: string | undefined;
    plz?: string | undefined;
    kategorie?: number | undefined;
    newsletter?: boolean | undefined;
    geburtsdatum?: Date | undefined;
    umsatz?: Umsatz | undefined;
    betrag?: number | undefined;
    waehrung?: string | undefined;
    homepage?: string | undefined;
    geschlecht?: KundeGeschlecht | undefined;
    familienstand?: Familienstand | undefined | '';
    interessen?: Array<string> | undefined;
    version?: number | undefined;
}

interface Link {
    href: string;
}

/**
 * Daten vom und zum REST-Server:
 * <ul>
 *  <li> Arrays f&uuml;r mehrere Werte, die in einem Formular als Checkbox
 *       dargestellt werden.
 *  <li> Daten mit Zahlen als Datentyp, die in einem Formular nur als
 *       String handhabbar sind.
 * </ul>
 */
export interface KundeServer extends KundeShared {
    interessen?: Array<string>;
    _links?: {
        self: Link;
        list?: Link;
        add?: Link;
        update?: Link;
        remove?: Link;
    };
}

/**
 * Daten aus einem Formular:
 * <ul>
 *  <li> je 1 Control fuer jede Checkbox und
 *  <li> au&szlig;erdem Strings f&uuml;r Eingabefelder f&uuml;r Zahlen.
 * </ul>
 */
export interface KundeForm extends KundeShared {
    sport?: boolean;
    lesen?: boolean;
    reisen?: boolean;
}

/**
 * Model als Plain-Old-Sport-Object (POJO) fuer die Daten *UND*
 * Functions fuer Abfragen und Aenderungen.
 */
export class Kunde {
    private static readonly SPACE = 2;

    //interessen: Array<string>;

    // wird aufgerufen von fromServer() oder von fromForm()
    // eslint-disable-next-line max-params
    private constructor(
        public _id: string | undefined,
        public nachname: string,
        public email: string | undefined,
        public username: string | undefined,
        public password: string | undefined,
        public ort: string | undefined,
        public plz: string | undefined,
        public kategorie: number | undefined,
        public newsletter: boolean | undefined,
        public geburtsdatum: Date | undefined,
        public betrag: number | undefined,
        public waehrung: string | undefined,
        public homepage: string | undefined,
        public geschlecht: KundeGeschlecht | undefined,
        public familienstand: Familienstand | undefined | '',
        public interessen: Array<string> | undefined,
        public version: number | undefined,
    ) {
        // TODO Parsing, ob der Geburtsdatum-String valide ist
        this.geburtsdatum =
            geburtsdatum === undefined ? new Date() : new Date(geburtsdatum);
        this.interessen = interessen === undefined ? [] : interessen;
        this.plz = '67069';
        this.ort = 'Ludwigshafen';
        this.username = 'test';
        this.password = 'p';
        this.waehrung = 'EUR';
        this.betrag = 9;

        console.log('Kunde(): this=', this);
    }

    /**
     * Ein Kunde-Objekt mit JSON-Daten erzeugen, die von einem RESTful Web
     * Service kommen.
     * @param kunde JSON-Objekt mit Daten vom RESTful Web Server
     * @return Das initialisierte Kunde-Objekt
     */
    static fromServer(kundeServer: KundeServer, etag?: string) {
        let selfLink: string | undefined;
        const { _links } = kundeServer;
        if (_links !== undefined) {
            const { self } = _links;
            selfLink = self.href;
        }
        let id: string | undefined;
        if (selfLink !== undefined) {
            const lastSlash = selfLink.lastIndexOf('/');
            id = selfLink.substring(lastSlash + 1);
        }

        let version: number | undefined;
        if (etag !== undefined) {
            // Anfuehrungszeichen am Anfang und am Ende entfernen
            const versionStr = etag.substring(1, etag.length - 1);
            version = Number.parseInt(versionStr, 10);
        }

        const kunde = new Kunde(
            id,
            kundeServer.nachname,
            kundeServer.email,
            kundeServer.username,
            kundeServer.password,
            kundeServer.plz,
            kundeServer.ort,
            kundeServer.kategorie,
            kundeServer.newsletter,
            kundeServer.geburtsdatum,
            kundeServer.betrag,
            kundeServer.waehrung,
            kundeServer.homepage,
            kundeServer.geschlecht,
            kundeServer.familienstand,
            kundeServer.interessen,
            version,
        );
        console.log('Kunde.fromServer(): kunde=', kunde);
        return kunde;
    }

    /**
     * Ein Kunde-Objekt mit JSON-Daten erzeugen, die von einem Formular kommen.
     * @param kunde JSON-Objekt mit Daten vom Formular
     * @return Das initialisierte Kunde-Objekt
     */
    static fromForm(kundeForm: KundeForm) {
        console.log('Kunde.fromForm(): kundeForm=', kundeForm);
        const interessen: Array<string> = [];
        if (kundeForm.sport === true) {
            interessen.push('S');
        }
        if (kundeForm.lesen === true) {
            interessen.push('L');
        }
        if (kundeForm.reisen === true) {
            interessen.push('R');
        }

        const waehrungEUR = 'EUR';

        const kunde = new Kunde(
            kundeForm._id,
            kundeForm.nachname,
            kundeForm.email,
            kundeForm.username,
            kundeForm.password,
            kundeForm.ort,
            kundeForm.plz,
            kundeForm.kategorie,
            kundeForm.newsletter,
            kundeForm.geburtsdatum,
            kundeForm.betrag,
            waehrungEUR,
            kundeForm.homepage,
            kundeForm.geschlecht,
            kundeForm.familienstand,
            interessen,
            kundeForm.version,
        );
        console.log('Kunde.fromForm(): kunde=', kunde);
        return kunde;
    }

    // Property in TypeScript wie in C#
    // https://www.typescriptlang.org/docs/handbook/classes.html#accessors
    get datumFormatted() {
        // z.B. 7. Mai 2020
        const formatter = new Intl.DateTimeFormat('de', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        return this.geburtsdatum === undefined
            ? ''
            : formatter.format(this.geburtsdatum);
    }

    /**
     * Abfrage, ob im Kundenachname der angegebene Teilstring enthalten ist. Dabei
     * wird nicht auf Gross-/Kleinschreibung geachtet.
     * @param nachname Zu &uuml;berpr&uuml;fender Teilstring
     * @return true, falls der Teilstring im Kundenachname enthalten ist. Sonst
     *         false.
     */
    containsNachname(nachname: string) {
        return this.nachname === undefined
            ? false
            : this.nachname.toLowerCase().includes(nachname.toLowerCase());
    }

    /**
     * Abfrage, ob das Kunde dem angegebenen Familienstand zugeordnet ist.
     * @param familienstand der Name des Familienstands
     * @return true, falls das Kunde dem Familienstand zugeordnet ist. Sonst false.
     */
    hasFamilienstand(familienstand: string) {
        return this.familienstand === familienstand;
    }

    /**
     * Aktualisierung der Stammdaten des Kunde-Objekts.
     * @param nachname Der neue Kundenachname
     * @param rating Die neue Bewertung
     * @param geschlecht Die neue Kundeart (M oder W)
     * @param familienstand Der neue Familienstand
     * @param umsatz Der neue Umsatz
     * @param rabatt Der neue Rabatt
     */
    // eslint-disable-next-line max-params
    updateStammdaten(
        nachname: string | undefined,
        geschlecht: KundeGeschlecht | undefined,
        familienstand: Familienstand | undefined | '',
        kategorie: number | undefined,
        geburtsdatum: Date | undefined,
        betrag: number | undefined,
        waehrung: string | undefined,
        plz: string | undefined,
        ort: string | undefined,
        username: string | undefined,
        password: string | undefined,
    ) {
        this.nachname = nachname;
        this.geschlecht = geschlecht;
        this.familienstand = familienstand;
        this.geburtsdatum =
            geburtsdatum === undefined ? new Date() : geburtsdatum;
        this.kategorie = kategorie;
        this.betrag = 9;
        this.waehrung = 'EUR';
        this.plz = '67069';
        this.ort = 'Ludwigshafen';
        this.username = 'test';
        this.password = 'p';
    }

    /**
     * Abfrage, ob es zum Kunde auch Interessen gibt.
     * @return true, falls es mindestens ein Interesse gibt. Sonst false.
     */
    hasInteressen() {
        if (this.interessen === undefined) {
            return false;
        }
        return this.interessen.length !== 0;
    }

    /**
     * Abfrage, ob es zum Kunde das angegebene Interesse gibt.
     * @param interesse das zu &uuml;berpr&uuml;fende Interesse
     * @return true, falls es das Interesse gibt. Sonst false.
     */
    hasInteresse(interesse: string) {
        if (this.interessen === undefined) {
            return false;
        }
        return this.interessen.includes(interesse);
    }

    /**
     * Aktualisierung der Interessen des Kunde-Objekts.
     * @param sport ist das Interesse SPORT gesetzt
     * @param lesen ist das Interesse LESEN gesetzt
     * @param reisen ist das Interesse REISEN gesetzt
     */
    updateInteressen(sport: boolean, lesen: boolean, reisen: boolean) {
        this.resetInteressen();
        if (sport) {
            this.addInteresse('S');
        }
        if (lesen) {
            this.addInteresse('L');
        }
        if (reisen) {
            this.addInteresse('R');
        }
    }

    /**
     * Konvertierung des Kundeobjektes in ein JSON-Objekt f&uuml;r den RESTful
     * Web Service.
     * @return Das JSON-Objekt f&uuml;r den RESTful Web Service
     */
    toJSON(): KundeServer {
        const geburtsdatum =
            this.geburtsdatum === undefined
                ? undefined
                : this.geburtsdatum.toISOString();
        console.log(`toJson(): geburtsdatum=${geburtsdatum}`);
        return {
            _id: this._id,
            nachname: this.nachname,
            email: this.email,
            kategorie: this.kategorie,
            newsletter: this.newsletter,
            geburtsdatum: this.geburtsdatum,
            umsatz: {
                betrag: this.betrag,
                waehrung: this.waehrung,
            },
            homepage: this.homepage,
            geschlecht: this.geschlecht,
            familienstand: this.familienstand,
            interessen: this.interessen,
            adresse: {
                plz: this.plz,
                ort: this.ort,
            },
            user: {
                username: this.username,
                password: this.password,
            },
        };
    }

    toString() {
        return JSON.stringify(this, null, Kunde.SPACE);
    }

    private resetInteressen() {
        this.interessen = [];
    }

    private addInteresse(interesse: string) {
        if (this.interessen === undefined) {
            this.interessen = [];
        }
        this.interessen.push(interesse);
    }
}
