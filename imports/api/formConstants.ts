// eslint-disable-next-line no-shadow
export enum fieldTypes {
     none,
     string,
     bool
}
export interface Field {
    type: fieldTypes,
    name: string,
    _id: string,
    primary?:boolean,
    description?: string,
    childFields?: Array<this>,
    childFieldsUnique?: boolean, // If there are multiple subfields, if multiple of them can be selected at once
}

const randString = () => Math.random().toString(36).substring(2);

export const namesToBoolFields = (namesArray:Array<string>):Array<Field> => namesArray.map((name):Field => ({ name, type: fieldTypes.bool, _id: randString() }));

// This constant defines the fields that are going to be used in our frontend.
// This should probably be replaced by something more mutable.
export const documentFields: Array<Field> = [
    {
        type: fieldTypes.string,
        name: "Full Name",
        primary: true,
        _id: randString(),
    },
    {
        type: fieldTypes.bool,
        name: 'WR/USCIS Payment',
        _id: randString(),
        description: 'https://www.uscis.gov/feecalculator',
        childFields: [
            {
                name: 'WR ILS Payment',
                type: fieldTypes.none,
                _id: randString(),
                childFields: namesToBoolFields(['DSHS Letter', 'Apple Health', 'Fee Internal Fee Waiver']),
                childFieldsUnique: true,
            },
            {
                name: 'USCIS Payment',
                type: fieldTypes.none,
                _id: randString(),
                childFields: namesToBoolFields(['Fee Waiver', 'Reduced $405 (Tax&HH Pay Stubs)', 'Fee $725']),
                childFieldsUnique: true,
            },
        ],
    },
    {
        type: fieldTypes.bool,
        name: 'Language/History & Civics screening',
        childFields: namesToBoolFields(['Sufficient', 'Not Sufficient', 'N648 screening needed', 'Age language waiver']),
        childFieldsUnique: true,
        _id: randString(),
    },
    {
        name: 'Over 18 and NOT a US Citizen',
        type: fieldTypes.bool,
        _id: randString(),
        description: 'Did not derive U.S. Citizenship through USC parents (inc. adoptive) prior to turning 18. ',
    },
    {
        name: 'Selective Service Registration checked/ completed/ '
            + 'or Status Info Letter requested if under age 31 (Male applicants only)',
        type: fieldTypes.bool,
        _id: randString(),
        description: 'https://www.sss.gov/Home/Verification '
            + 'If over 26 and not registered, client needs to request a Status Information Letter through'
            + ' https://www.sss.gov/Home/Men-26-and-OLDER',
    },

];

function genBlankForm(form:Array<Field>) {
    let thisData = {};
    form.forEach((f) => {
        const obj = f.childFields ? genBlankForm(f.childFields) : {};
        switch (f.type) {
        case fieldTypes.bool:
            obj[f._id] = false;
            break;
        case fieldTypes.string:
            obj[f._id] = '';
            break;
        default:
            obj[f._id] = undefined;
        }
        thisData = { ...thisData, ...obj };
    });

    return thisData;
}
