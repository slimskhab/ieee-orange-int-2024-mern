import React, { useEffect, useState } from "react";
import CustomSideBar from "../../components/CustomSideBar/CustomSideBar";
import {
  CopyOutlined,
  DownOutlined,
  FileImageOutlined,
  FormOutlined,
  InfoCircleOutlined,
  MenuOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./Notes.css";
import {
  Button,
  Card,
  Dropdown,
  Input,
  message,
  Modal,
  Space,
  Statistic,
} from "antd";
import { UserData } from "./../../../utils/UserData";
import { useNavigate } from "react-router-dom";
import axiosRequest from "../../../utils/AxiosConfig";
import NoteCard from "../../components/NoteCard/NoteCard";
import TextArea from "antd/es/input/TextArea";

function Notes() {
  const [drawer, setDrawer] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDescription, setNoteDescription] = useState("");
  const [noteType, setNoteType] = useState("");
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const userData = UserData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [editingNote, setEditingNote] = useState(null);

  const [messageApi, contextHolder] = message.useMessage();

  const showtoast = (type, message) => {
    messageApi.open({
      type: type,
      content: message,
      style: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: "absolute",
      },
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingNote(null); // Reset the editing note state
  };

  const handleDeleteNote = (noteId) => {
    setButtonLoading(true);
    axiosRequest
      .post(`/note/delete`, { noteId })
      .then((res) => {
        showtoast("success", "Deleted Note successfully");
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
      })
      .catch((err) => {
        const errorMessage = err.response
          ? err.response.data.message
          : "An error occurred";
        showtoast("error", errorMessage);
      })
      .finally(() => {
        setButtonLoading(false);
      });
  };

  const handleAddNote = () => {
    setButtonLoading(true);
    const formData = new FormData();
    formData.append("noteTitle", noteTitle);
    formData.append("noteDescription", noteDescription);
    formData.append("noteType", noteType);
    formData.append("userId", userData.id);
    formData.append("file", file);
    axiosRequest
      .post(`/note/add`, formData)
      .then((res) => {
        setIsModalOpen(false);
        showtoast("success", "Created Note successfully");
        setNotes((prevNotes) => [...prevNotes, res.data.note]);
      })
      .catch((err) => {
        setIsModalOpen(false);
        const errorMessage = err.response
          ? err.response.data.message
          : "An error occurred";
        showtoast("error", errorMessage);
      })
      .finally(() => {
        setButtonLoading(false);
      });
  };

  const handleEditNote = (note) => {
    setNoteTitle(note.noteTitle);
    setNoteDescription(note.noteDescription);
    setNoteType(note.noteType);
    setImageUrl(`${import.meta.env.VITE_BACKEND}/${note.noteImage}`);
    setEditingNote(note);
    showModal();
  };

  const handleSaveEdit = () => {
    setButtonLoading(true);
    const formData = new FormData();
    formData.append("noteTitle", noteTitle);
    formData.append("noteDescription", noteDescription);
    formData.append("noteType", noteType);
    formData.append("noteId", editingNote.id);
    formData.append("file", file);
    axiosRequest
      .post(`/note/edit`, formData)
      .then((res) => {
        setIsModalOpen(false);
        showtoast("success", "Updated Note successfully");
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === res.data.note.id ? res.data.note : note
          )
        );
      })
      .catch((err) => {
        setIsModalOpen(false);
        const errorMessage = err.response
          ? err.response.data.message
          : "An error occurred";
        showtoast("error", errorMessage);
      })
      .finally(() => {
        setButtonLoading(false);
      });
  };

  const items = [
    {
      label: "Research Note",
      key: "1",
      icon: <UserOutlined />,
    },
    {
      label: "Meeting Note",
      key: "2",
      icon: <UserOutlined />,
    },
    {
      label: "Lecture Note",
      key: "3",
      icon: <UserOutlined />,
    },
    {
      label: "Study Note",
      key: "4",
      icon: <UserOutlined />,
    },
  ];
  const handleMenuClick = (e) => {
    const selectedNoteType = items.find((item) => item.key === e.key)?.label;
    setNoteType(selectedNoteType);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  useEffect(() => {
    if (!userData) {
      navigate("/login");
    }
    setLoading(true);
    axiosRequest
      .post(`/note`, { userId: userData.id })
      .then((res) => {
        setNotes(res.data.note);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        height: "100%",
      }}
    >
      <div className="drawer-button">
        <MenuOutlined onClick={() => setDrawer(!drawer)} />
      </div>
      <CustomSideBar selectedItem="notes" drawer={drawer} />
      <div
        style={{
          width: "80%",
          display: "flex",
          margin: 20,
          flexDirection: "column",
        }}
        onClick={() => setDrawer(!drawer)}
      >
        <div style={{ display: "flex", width: "100%", justifyContent: "end" }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            iconPosition={"end"}
            onClick={showModal}
          >
            Add Note
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            gap: "20px",
            height: "min-content",
            flexWrap: "wrap",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          {notes && notes.length > 0 ? (
            notes.map((e, i) => (
              <NoteCard
                key={e.id}
                loading={loading}
                note={e}
                handleDeleteNote={handleDeleteNote}
                handleEditNote={handleEditNote}
              />
            ))
          ) : (
            <div>Loading</div>
          )}
        </div>
      </div>
      <Modal
        title={editingNote ? "Edit note" : "Create note"}
        open={isModalOpen}
        onOk={editingNote ? handleSaveEdit : handleAddNote}
        onCancel={handleCancel}
        okText={editingNote ? "Update" : "Create"}
        okButtonProps={{ loading: buttonLoading }}
      >
        <div>
          <label>Note Title:</label>
          <Input
            prefix={<InfoCircleOutlined />}
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
          ></Input>
        </div>
        <br />
        <div>
          <label>Note Description:</label>
          <TextArea
            prefix={<InfoCircleOutlined />}
            value={noteDescription}
            onChange={(e) => setNoteDescription(e.target.value)}
          ></TextArea>
        </div>
        <br />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "min-content",
          }}
        >
          <label>Note Type:</label>

          <Dropdown menu={menuProps}>
            <Button>
              {noteType || "Select Type"} <DownOutlined />
            </Button>
          </Dropdown>
        </div>

        <div>
          <label>Note Image:</label>
          <Input
            prefix={<FileImageOutlined />}
            type="file"
            onChange={handleFileChange}
          ></Input>
        </div>
        {imageUrl && (
          <div>
            <img
              src={imageUrl}
              alt="Selected"
              style={{ width: "100%", marginTop: "10px" }}
            />
          </div>
        )}
      </Modal>
      {contextHolder}
    </div>
  );
}

export default Notes;
