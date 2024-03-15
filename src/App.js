import './App.css';
import {useEffect, useState} from "react";
import CertificateList from "./components/componentCertifacateList/CertificateList";
import CertificateInfo from "./components/componentCertificateInfo/CertificateInfo";
import {getFromStorage, setStorage} from "./data/localStorage";
import asn1 from "./data/asn1";
import MyButton from "./components/UI/button/MyButton";

function App() {

    const [drag, setDrag] = useState(false);
    const [isInfo, setIsInfo] = useState(false);
    const [certificateInfo, setCertificateInfo] = useState({});
    const [select, setSelect] = useState();
    const [listFiles,setListFiles] = useState([]);

    const setAllCer = () => {
        const store = getFromStorage();
        setListFiles(
            store.filter((c) => c.hasOwnProperty('idName'))
                .sort((a, b) => a.dateAdded - b.dateAdded)
        );
    }

    useEffect(() => {
        setAllCer()
    }, []);

    function dragStartHandler(e) {
        e.preventDefault();
        setDrag(true);
        setIsInfo(false);
        setSelect('');
    }

    function dragEnd(e) {
        setDrag(false);
        setSelect('');
    }

    function onDropHandler(e) {
        e.preventDefault();
        let files;
        if(e["_reactName"] === "onDrop"){
            files = e.dataTransfer.files;
        }
        else {
            files = e.target.files;
        }

        for (let i=0;i<files.length;i++){
            const reader = new FileReader();
            reader.readAsBinaryString(files[i]);
            reader.onload = () => {
                let result = asn1(reader.result, files[i].name);
                setStorage(files[i].name, result);
                setAllCer()
            };
        }

        setDrag(false);
        setSelect('');
    }

    function certificateOnClickHandler(e) {
        const cerName = e.target.dataset.name;
        setCertificateInfo(listFiles.find((c) => c.idName === cerName));
        setIsInfo(true);
        setSelect(cerName);
    }


    return (
    <div className="App">
        <div className="cer-list">
            {!drag ? (
                <MyButton className={"add-button"} onClick={(e) => dragStartHandler(e)}>Додати</MyButton>
            ) : (
                <MyButton className={"add-button"} onClick={(e) => dragEnd(e)}>Назад</MyButton>
            )}
            <CertificateList
                select={select}
                certificates={listFiles}
                onClick={certificateOnClickHandler}
                drag={drag}
            />
        </div>
        {isInfo ? (
            <CertificateInfo cerInfo={certificateInfo} />
        ) : drag ? (
            <div
                className="area drop-area"
                onDragOver={(e) => dragStartHandler(e)}
                onDrop={(e) => onDropHandler(e)}
            >
                <span>Перетягніть файл сертифіката у поле</span>
                <span>або</span>
                <label className="file-input">
                        <input type="file" multiple accept={'.cer'} onChange={onDropHandler}/>
                    <span>Виберіть через стандартний діалог</span>
                </label>
            </div>
        ) : (listFiles.length > 0 ? (
            <div className="area choose-area">
                Виберіть сертифікат, щоб переглянути інформацію
            </div>
                ) :
                <></>
        )}
    </div>
  );
}

export default App;
