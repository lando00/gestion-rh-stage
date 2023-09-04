import Cookies from "js-cookie";
import { createContext, useState, useReducer } from "react";

const CustomeContext = createContext({});

export const CustomeContextProvider = ({ children }) => {

    // toast
    const [ showToast, setShowToast ] = useState(false);
    const [ isSuccess, setIsSuccess ] = useState(false);
    const [ toastMessage, setToastMessage ] = useState('');
    const [ toastTitle, setToastTitle ] = useState('');

    // scanner
    const [ showScanner, setShowScanner ] = useState(false);
    const [ stopScan, setStopScan ] = useState(false)

    // info personnl
    const [infoPersonnel, setInfoPersonnel ] = useState([]);

    // autorisation modal
    const [isValidation, setIsValidation] = useState(false);
    const [isModification, setIsModification] = useState(false);
    const [isNewDemande, setIsNewDemande ] = useState(false);
    const [modalshow, setModalshow ] = useState(false)

    // mission &  nouvelle mission
    const [isOutlet, setIsOutlet] = useState(false);

    // date autorisation et demande
    const [ debut, setDebut ] = useState('')
    const [ fin, setFin ] = useState('')
    const [ reprise, setReprise ] = useState('')
    const [ reqbody, setReqbody ] = useState({
        matricule_agent: Cookies.get("matricule"),
        prenoms: Cookies.get("prenoms"),
        type_agent: Cookies.get("role"),
        IM_responsable: '',
        debut_autorisation: '',
        fin_autorisation: '',
        duree_autorisation: '',
        reprise_de_service: '',
        lieu_jouissance: '',
        etat_autorisation: '',
        type_service: Cookies.get("service"),
        type_autorisation: '',
        motif: '',
        id_demandeA: '',
        raison:'',
        etat_de_la_demande: 'nouvelle'
    })

    // update page
    const [useReducerValue, forceUpdate ] = useReducer(x=>x+1,0)


    // donnes necessaires au pointage
    const [ isValidable, setIsValidable ] = useState(false)
    const [ isActif, setIsActif ] = useState(false)
    const [ isInconnu, setIsInconnu ] = useState(false)
    const [ datapointage, setDatapointage ] = useState({
        IM: '',
        PRENOMS: '',
        heure_arrivee: '',
        TYPE_SERVICE: ''
    })

    // liste des services 
    const [ listeservices, setListeservices ] = useState({
        prmp: 'PRMP',
        sbr: 'Service Bureau Regional',
        st: 'Service technique',
       srdc: 'Service relation avec Direction Central' 
    }) 

    // rapport
    const [ totalnotification, setTotalnotification ] = useState(0)


    return (
        <CustomeContext.Provider value = {{
            // toast
            showToast, 
            setShowToast,
            isSuccess, 
            setIsSuccess,
            toastMessage, 
            setToastMessage,
            toastTitle,
            setToastTitle,

            // scanner
            showScanner, 
            setShowScanner,
            stopScan, 
            setStopScan,

            // info personnel
            infoPersonnel,
            setInfoPersonnel,

            // autorisation modal
            isValidation,
            setIsValidation,
            isModification,
            setIsModification,
            isNewDemande,
            setIsNewDemande,
            modalshow, 
            setModalshow ,

            // mission & nouvellemission
            isOutlet,
            setIsOutlet,

            // date autorisation et demande
            debut, 
            setDebut,
            fin, 
            setFin,
            reprise, 
            setReprise,
            reqbody, 
            setReqbody,

            // donnees necessaires au pointage
            datapointage,
            setDatapointage,
            isValidable, 
            setIsValidable,
            isActif,
            setIsActif,
            isInconnu, 
            setIsInconnu,

            // liste des services
            listeservices, 
            setListeservices,

            // rapport
            totalnotification, 
            setTotalnotification,

            // update page
            useReducerValue,
            forceUpdate
        }}>
            { children }
        </CustomeContext.Provider>
    )
}

export default CustomeContext;