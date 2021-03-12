export enum fieldTypes {
     none,
     string,
     bool
}
export interface clientFormField {
    type: fieldTypes,
    name: string,
    description?: string,
    subFields?: Array<this>,
    subFieldsUnique?: boolean, // If there are multiple subfields, if multiple of them can be selected at once
}

export const namesToBoolFields = (namesArray:Array<string>):Array<clientFormField> => namesArray.map((name):clientFormField => ({ name, type: fieldTypes.bool }));

const documentFields: Array<clientFormField> = [
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
                subFields: namesToBoolFields(
                    ['DSHS Letter',
                        'Apple Health',
                        'Fee Internal Fee Waiver',
                    ],
                ),
            },
        ],
    },
];
