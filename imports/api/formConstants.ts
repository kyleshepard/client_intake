// eslint-disable-next-line no-shadow
export enum fieldTypes {
     none,
     string,
     bool
}
export interface Field {
    type: fieldTypes,
    name: string,
    description?: string,
    subFields?: Array<this>,
    subFieldsUnique?: boolean, // If there are multiple subfields, if multiple of them can be selected at once
}

export const namesToBoolFields = (namesArray:Array<string>):Array<Field> => namesArray.map((name):Field => ({ name, type: fieldTypes.bool }));

export const documentFields: Array<Field> = [
    {
        type: fieldTypes.string,
        name: "Full Name",

    },
    {
        type: fieldTypes.bool,
        name: 'WR/USCIS Payment',
        description: 'https://www.uscis.gov/feecalculator',
        subFields: [
            {
                name: 'WR ILS Payment',
                type: fieldTypes.none,
                subFields: namesToBoolFields(['DSHS Letter', 'Apple Health', 'Fee Internal Fee Waiver']),
                subFieldsUnique: true,
            },
            {
                name: 'USCIS Payment',
                type: fieldTypes.none,
                subFields: namesToBoolFields(['Fee Waiver', 'Reduced $405 (Tax&HH Pay Stubs)', 'Fee $725']),
                subFieldsUnique: true,
            },
        ],
    },
    {
        type: fieldTypes.bool,
        name: 'Language/History & Civics screening',
        subFields: namesToBoolFields(['Sufficient', 'Not Sufficient', 'N648 screening needed', 'Age language waiver']),
        subFieldsUnique: true,
    },
    {
        name: 'Over 18 and NOT a US Citizen',
        type: fieldTypes.bool,
        description: 'Did not derive U.S. Citizenship through USC parents (inc. adoptive) prior to turning 18. ',
    },
    {
        name: 'Selective Service Registration checked/ completed/ '
            + 'or Status Info Letter requested if under age 31 (Male applicants only)',
        type: fieldTypes.bool,
        description: 'https://www.sss.gov/Home/Verification '
            + 'If over 26 and not registered, client needs to request a Status Information Letter through'
            + ' https://www.sss.gov/Home/Men-26-and-OLDER',
    },

];
