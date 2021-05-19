// eslint-disable-next-line no-shadow
export enum fieldTypes {
     none,
     string,
     bool,
     file,
}
export interface Field {
    type: fieldTypes,
    name: string,
    _id: string,
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
        type: fieldTypes.file,
        name: "File Uploads",
        _id: randString(),
    },
    {
        type: fieldTypes.none,
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
        type: fieldTypes.none,
        name: 'Language/History & Civics screening',
        childFields: namesToBoolFields([
            'Sufficient',
            'Not Sufficient',
            'N648 screening needed',
            'Age language waiver',
        ]),
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
    {
        name: 'Has lived in the USCIS District for 3 months prior to filing ',
        description: 'District 20 Jurisdiction: Washington, Northern Idaho, Oregon, Alaska USCIS Field Offices within '
            + 'District 20: Anchorage, Portland, Seattle, Spokane, Yakima',
        _id: randString(),
        type: fieldTypes.bool,
    },
    {
        name: 'ts LPR requirement',
        description: 'Please check Green Card to confirm: LPR for 4 years and 9 months or 3 years if married to a US '
            + 'citizen for 3 years; also 3 years if green card based on VAWA (?)',
        _id: randString(),
        type: fieldTypes.bool,
    },

    {
        name: 'Meets physical presence requirement',
        description: 'Total days spent outside the U.S. should not exceed '
            + '2.5 years (913 days) within the past 5 years.',
        _id: randString(),
        type: fieldTypes.bool,
    },
    {
        name: 'Meets continuous residence requirement',
        description: ' No single trips over 1 year (365 days).  Single trips over '
            + '6 months will require further documentation to overcome a disruption in continuous residence.',
        _id: randString(),
        type: fieldTypes.bool,
    },
    {
        name: 'Voter Registration checked',
        description: 'https://www.usa.gov/election-office '
            + '\n- check each state client has resided in as reported on their residential history.',
        _id: randString(),
        type: fieldTypes.bool,
    },
    {
        name: ' Court records checked/received',
        description:
            'A printed online court docket or a phone call to confirm charges and final disposition is sufficient '
            + 'for minor traffic violations w/fines under $500. Criminal charges require:'
            + '\n- Extended court dockets w/disposition'
            + '\n- Charging docs/reports '
            + '\n- SOC/probation/deferral records'
            + '\n- Police Incident/Case reports',
        _id: randString(),
        type: fieldTypes.bool,
        childFields: [
            {
                name: 'Extensive out of state court case history '
                    + 'requires an FBI background check https://dw.courts.wa.gov/ to '
                    + 'view WA State case history search by names as they appears on WA State '
                    + 'ID/DL and GC. Print search results for file.',
                description:
                    'http://justicewebview.spokanecity.org/justicewebview/  '
                    + '\n- Spokane Municipal Court records to check charges '
                    + 'and case dispositions by case # (Only viewable through Internet Explorer browser). '
                    + 'Email MC request form to: mcadmin@spokanecity.org '
                    + 'https://cp.spokanecounty.org/courtdocumentviewer/ '
                    + '\n- Spokane District/Superior Court dockets. Email District Court '
                    + 'request form to: DCCaseMgmt@spokanecounty.org '
                    + '\nIn-person requests for Spokane County Court Records @ the Public Safety Building '
                    + '(1100 W Mallon Ave, Spokane, WA 99260) or the Superior Court Building next door. '
                    + 'For out of state or other WA county court/police records: google or call the court to '
                    + 'confirm charges and case dispositions.',
                _id: randString(),
                type: fieldTypes.bool,
            },
        ],
    },

    {
        name: 'Police Records – Incident/Case reports received',
        description: 'Reckless driving, DUI, Assault, and other  criminal charges will require certified police '
            + 'records (incident/case reports) '
            + '\nIn-person requests @ the Public Safety Building '
            + '\n\t- 1100 W Mallon Ave  OR  --- > https://my.spokanecity.org/police/information/'
            + '\n- Police Incident/Case ReportsSpokane County Public Records:'
            + '\n\t Login ID:  ilsspokane@wr.org Password: ***REMOVED***'
            + '\nSpokane City Public Records:'
            + '\n\t Login ID:  ilsspokane@wr.org Password: ***REMOVED***'
            + '\nWashington State Patrol:   https://www.wsp.wa.gov/ '
            + '\n\t- Click on ‘ I want to…’  and select ‘Request Public Disclosure Records’'
            + '\n\t Login ID:  ilsspokane@wr.org Password: ***REMOVED***'
            + '\nKalispell Tribe Police Department:  P: (509) 447-7124 or E:  rmorrill@kalispeltribe.com',
        _id: randString(),
        type: fieldTypes.bool,
    },
    {
        name: 'Criminal Record outside of WA State/ other concerns (call client)',
        description: '',
        _id: randString(),
        type: fieldTypes.bool,
    },
    {
        name: "Notes",
        description: '',
        _id: randString(),
        type: fieldTypes.string,
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
