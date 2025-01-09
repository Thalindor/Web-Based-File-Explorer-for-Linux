import React, { useEffect, useState } from 'react'
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FolderIcon from '@mui/icons-material/Folder';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import "./home.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import CloseIcon from '@mui/icons-material/Close';
import AddModeratorIcon from '@mui/icons-material/AddModerator';

export default function Home({pwd, username, setPwd}) {
    const navigate = useNavigate();
    const [folders, setFolders] = useState([]); // Folder list state
    const [files, setFiles] = useState([]); // File list state
    const [fileName, setFileName] = useState("")

    const [createFileIndex, setCreateFileIndex] = useState(false)
    const [createFolderIndex, setCreateFolderIndex] = useState(false)

    const [activeFolderIndex, setActiveFolderIndex] = useState(null);
    const [activeFolderName, setActiveFolderName] = useState(null);
    const [deleteFolder, setDeleteFolder] = useState("");

    const [activeFileIndex, setActiveFileIndex] = useState(null);
    const [activeFileName, setActiveFilerName] = useState(null);
    const [text, setText] = useState("")
    const [readText, setReadText] = useState("")
    const [readTextState, setReadTextState] = useState(false)
    const [setTextState, setSetTextState] = useState(false)
    const [ls , setLs] = useState(false)
    
    const [chmod , setChmod] = useState("")
    const [chmodState, setChmodState] = useState(false)


    const handleLogout = () => {
        navigate('/');
    };




    async function writeText() {
        try {
            const response = await axios.post('http://localhost:3001/api/echo/echo', {pwd, activeFileName, text});
        } catch (error) {
            console.error('Error writing file:', error);
        }
        setSetTextState(false)
    }

    const handleWriteText = () => {
        if(setTextState){
            setSetTextState(false)
            setActiveFileIndex(null)
        }else{
            setSetTextState(true)
            setActiveFileIndex(null)
        }
    };

    const handleChmod = () => {
        if(chmodState){
            setChmodState(false)
            setActiveFileIndex(null)
        }else{
            setChmodState(true)
            setActiveFileIndex(null)
        }
    };

    
    async function changeChmod() {
        setChmodState(false)
        showDirectory();
        try {
            const response = await axios.post('http://localhost:3001/api/chmod/chmod', {pwd, activeFileName, selectedChmod});
            console.log(response)
        } catch (error) {
            console.error('Error writing file:', error);
        }
        setSetTextState(false)
    }



    async function readTextFunction() {
        try {
            const response = await axios.post('http://localhost:3001/api/cat/cat', {pwd, activeFileName});
            setReadText(response.data)
            setReadTextState(true)
            setActiveFileIndex(null)
        } catch (error) {
            console.error('Error writing file:', error);
        }
    }

    async function closeReadTextFunction() {
        setReadTextState(false)
    }


    async function cdBackFunction() {
        try {
            const response = await axios.post('http://localhost:3001/api/cdBack/cdBack', {pwd});
            setPwd(response.data)
        } catch (error) {
            console.error('Error creating file:', error);
        }
        setActiveFolderIndex(null)
        setActiveFileIndex(null)
    }

    async function cdFunction() {
        try {
            const response = await axios.post('http://localhost:3001/api/cd/cd', {pwd, activeFolderName});
            setPwd(response.data)
        } catch (error) {
            console.error('Error creating file:', error);
        }
        setActiveFolderIndex(null)
        setActiveFileIndex(null)
    }

    const handleDeleteFolder = async () => {
        setLs(true)
        setActiveFolderIndex(null)
        try {
            if(activeFolderName !== null){
                const response = await axios.post('http://localhost:3001/api/delete/rm', { activeFolderName, pwd, username });
                setActiveFolderIndex(null);
                setActiveFolderName(null);
                await showDirectory();
            }
        } catch (error) {
            console.error('Error deleting folder:', error);
        }
        await showDirectory();
    };

    useEffect(() =>{
        showDirectory()
    },[ls])
    
    const handleDeleteFile = async () => {
        setLs(true)
        setActiveFileIndex(null)

        try {
            const response = await axios.post('http://localhost:3001/api/rmFiles/rmFiles', { activeFileName, pwd, username });
            // Reset active states and refresh file view
            setActiveFileIndex(null);
            setActiveFilerName(null);
    
            // Reload directory to exclude deleted file
            await showDirectory();
        } catch (error) {
            console.error('Error deleting file:', error);
        }
        await showDirectory();
        setLs(true)
    };
    
    

    const handleFolderClick = (index, name, permissions) => {
        setLs(false)
        setActiveFileIndex(null)

        if (activeFolderIndex === index) {
            setActiveFolderIndex(null);
            setActiveFolderName(null);
            setDeleteFolder("");
        } else {
            setActiveFolderIndex(index);
            setActiveFolderName(name);
            setDeleteFolder(name);
        }
    };
    
    const handleFileClick = (index, name, permissions) => {
        setLs(false)
        setActiveFolderIndex(null)
        if (activeFileIndex === index) {
            setActiveFileIndex(null);
            setActiveFilerName(null);
        } else {
            setActiveFileIndex(index);
            setActiveFilerName(name);
        }
    };
    

    const handleInputChange = (event) => {
        setFileName(event.target.value); 
    };

    const handleInputFileChange = (event) => {
        setText(event.target.value); 
    };

    async function showDirectory() {
        try {
            const response = await axios.post('http://localhost:3001/api/dir/ls', { pwd, username });
            const lines = response.data.split('\n'); 
            const parsedFolders = [];
            const parsedFiles = [];
    
            lines.forEach(line => {
                if (line.trim()) { 
                    const parts = line.split(/\s+/);
                    const permissions = parts[0]; // İlk sütun izinler
                    const owner = parts[2]; // Üçüncü sütun sahibin adı
                    const name = parts.slice(8).join(' '); // 9. sütundan sonrasını dosya/ad olarak al
    
                    // Eğer "d" ile başlıyorsa, klasör olarak kabul et
                    if (permissions.startsWith('d')) {
                        parsedFolders.push({ name, permissions, owner });
                    } else {
                        parsedFiles.push({ name, permissions, owner });
                    }
                }
            });
    
            setFolders(parsedFolders); // Klasörleri state'e ekle
            setFiles(parsedFiles); // Dosyaları state'e ekle
        } catch (error) {
            console.error('Error listing directory:', error);
        }
    }
    

    async function handleNewFolder() {
        setCreateFolderIndex(true)
        setCreateFileIndex(false)

    }

    async function handleNewFile() {
        setCreateFileIndex(true)
        setCreateFolderIndex(false)

    }

    async function cancelNewFolder() {
        setCreateFolderIndex(false)
        setCreateFileIndex(false)
        setFileName('')
    }

    async function createFolder() {
        if(createFileIndex){
            try {
                const response = await axios.post('http://localhost:3001/api/file/touch', { username, pwd, fileName });
                setFileName("")
            } catch (error) {
                console.error('Error creating file:', error);
            }
            setCreateFileIndex(false)
        }else if(createFolderIndex){
            try {
                const response = await axios.post('http://localhost:3001/api/folder/mkdir', { username, pwd, fileName });
                setFileName("")
            } catch (error) {
                console.error('Error creating file:', error);
            }            
            setCreateFolderIndex(false)
        }
    }

    useEffect(() => {
        showDirectory();
    }, [fileName,pwd,activeFileIndex,activeFolderIndex, activeFileName, activeFolderName]); 

    const [selectedChmod, setSelectedChmod] = useState(null);

    const handleClick = (chmodValue) => {
        setSelectedChmod(chmodValue);
    };

    useEffect(() => {
        console.log(selectedChmod)
    }, [selectedChmod]); 

    return (
        <div className="main-div">
            <div className="navbar">
                <div className="navbar-left">
                    <TravelExploreIcon style={{ fontSize: '50px' }} />
                    <h2>Web Based File Explorer</h2>
                </div>
                <div className="navbar-right">
                    <FileDownloadIcon style={{ fontSize: '30px', cursor: "pointer" }} />
                    <FileUploadIcon style={{ fontSize: '30px', cursor: "pointer" }} />
                    <InfoIcon style={{ fontSize: '30px', cursor: "pointer" }} />
                </div>
            </div>

            <div className="content">
                {
                    (createFileIndex || createFolderIndex) &&
                    <div className="newFileFolder">
                        <input
                            type="text"
                            value={fileName}
                            onChange={handleInputChange}
                            placeholder="Enter Name"
                        />
                        <div className="nff-buttons">
                            <button className='newFileButton' onClick={cancelNewFolder}>Cancel</button>
                            <button className='newFileButton' onClick={createFolder}>Save</button>
                        </div>
                    </div>
                }


                <div className="content-left">
                    <div className="content-left-top">
                        <div className="clb-c">
                            <FolderIcon style={{ fontSize: '25px' }} />
                            <h2>My Files</h2>
                        </div>
                    </div>
                    <hr className='hr-left' />
                    <div className="content-left-center">
                        <div className="clb-c" onClick={handleNewFolder} >
                            <CreateNewFolderIcon/>
                            <h2>New Folder</h2>
                        </div>
                        <div className="clb-c" onClick={handleNewFile}>
                            <NoteAddIcon />
                            <h2>New File</h2>
                        </div>
                    </div>
                    <hr className='hr-left' />
                    <div className="content-left-bottom">
                        <div className="clb-c">
                            <SettingsIcon />
                            <h2>Settings</h2>
                        </div>
                        <div className="clb-c" onClick={handleLogout}>
                            <ExitToAppIcon />
                            <h2>Logout</h2>
                        </div>
                    </div>
                </div>

                <div className="content-right">
                    <div className="content-right-top">
                        <div className="crt-left">
                            <div className="crt-left-left">
                                <HomeIcon style={{ fontSize: '30px' }} />
                                <h3>{username}</h3>
                            </div>
                            <div className="crt-right-right">
                            {
                                activeFolderIndex !== null && (
                                    <div className="delete-container">
                                        <h3 className="crt-hr3">|</h3>
                                        <DeleteIcon
                                            style={{ fontSize: '25px', color: "#F93827", cursor: "pointer" }}
                                            onClick={handleDeleteFolder} 
                                        />
                                        <ArrowCircleUpIcon
                                            style={{ fontSize: '25px', cursor: "pointer" }}
                                            onClick={cdFunction}
                                        />
                                    </div>
                                )
                            }

                            {
                                activeFileIndex !== null && (
                                    <div className="delete-container">
                                        <h3 className="crt-hr3">|</h3>
                                        <DeleteIcon
                                            style={{ fontSize: '25px', color: "#F93827", cursor: "pointer" }}
                                            onClick={handleDeleteFile} // Delete the file
                                        />
                                        <ChromeReaderModeIcon
                                            style={{ fontSize: '25px', cursor: "pointer" }}
                                            onClick={readTextFunction}
                                        />
                                        < EditIcon 
                                            style={{ fontSize: '25px', cursor: "pointer" }}
                                            onClick={handleWriteText}
                                        />
                                        < AddModeratorIcon 
                                            style={{ fontSize: '25px', cursor: "pointer" }}
                                            onClick={handleChmod}
                                        />
                                    </div>
                                )
                            }


                            </div>
                        </div>
                        <div className="crt-right">
                            <ArrowCircleLeftIcon style={{ fontSize: '35px', cursor: 'pointer' }} onClick={cdBackFunction} />
                            <h3>{pwd}</h3>
                        </div>
                    </div>
                    <hr className='hr-right' />

                    {!readTextState && !setTextState && !chmodState ? (
    <>
        <div className="folders">
            <p className="folder-p">Folders</p>
            <div className="files-div">
                {folders.map((folder, index) => (
                    <div
                        className={`file-div ${activeFolderIndex === index ? 'active' : ''}`}
                        key={index}
                        onClick={() => handleFolderClick(index, folder.name, folder.permissions)}
                    >
                        <FolderIcon style={{ fontSize: '52px' }} />
                        <div className="file-div-right">
                            <h3>{folder.name}</h3>
                            <div className="pS">
                                <p className="file-p owner">{folder.owner}</p>
                                <p className="file-p">{folder.permissions}</p>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="files">
            <p className="folder-p">Files</p>
            <div className="files-div">
                {files.map((file, index) => (
                    <div
                        className={`file-div ${activeFileIndex === index ? 'active' : ''}`}
                        key={index}
                        onClick={() => handleFileClick(index, file.name, file.permissions)}
                    >
                        <InsertDriveFileIcon style={{ fontSize: '52px' }} />
                        <div className="file-div-right">
                            <h3>{file.name}</h3>
                            <div className="pS">
                                <p className="file-p owner">{file.owner}</p>
                                <p className="file-p">{file.permissions}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
) : (
    <>
        {readTextState && (
            <div className="readText">
                <div className="blankTop" onClick={closeReadTextFunction}>
                    <CloseIcon style={{ fontSize: '30px', cursor: 'pointer' }} />
                </div>
                <div className="text-content">
                    <p>{readText}</p>
                </div>
            </div>
        )}

        {setTextState && (
            <div class="typeFile">
            <textarea
                value={text}
                onChange={handleInputFileChange}
                placeholder="Enter Text"
                class="auto-grow-textarea"
            ></textarea>
            <div class="typeFiles-buttons">
                <button  onClick={handleWriteText}>Cancel</button>
                <button  onClick={writeText}>Save</button>
            </div>
        </div>

        )}

        { chmodState && (
            <div className="chmodFile">
                <div className="chmods">
                    {['chmod 777', 'chmod 644', 'chmod a+w', 'chmod a+x', 'chmod u+rwx', 'chmod u+rw', 'chmod u+r'].map((chmod, index) => (
                        <div
                            key={index}
                            className="chmod"
                            onClick={() => handleClick(chmod)}
                        >
                            <h1 style={{
                                backgroundColor: selectedChmod === chmod ? '#fff' : '#333',
                                borderColor: selectedChmod === chmod ? '#333' : '#fff',
                                borderWidth: '2px',
                                borderStyle: 'solid',
                                color: selectedChmod === chmod ? '#333' : '#fff',
                            }}>
                                {chmod}
                            </h1>
                            <p>
                                {chmod === 'chmod 777' && 'Give read, write, and execute permissions to all users'}
                                {chmod === 'chmod 644' && 'Give read permission to all users'}
                                {chmod === 'chmod a+w' && 'Give write permission to all users'}
                                {chmod === 'chmod a+x' && 'Give execute permission to all users'}
                                {chmod === 'chmod u+rwx' && 'Give read, write, and execute permission to the file owner'}
                                {chmod === 'chmod u+rw' && 'Give read and write permission to the file owner'}
                                {chmod === 'chmod u+r' && 'Give read permission to the file owner'}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="chmodButtons">
                    <button onClick={handleChmod}>Cancel</button>
                    <button onClick={changeChmod}>Save</button>
                </div>
            </div>
        )}

    </>
)}
                </div>
            </div>
        </div>
    );
}
