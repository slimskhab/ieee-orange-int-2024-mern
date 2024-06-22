import React from 'react';
import { DeleteOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Avatar, Card, Skeleton } from 'antd';
const { Meta } = Card;

function NoteCard({loading, note, handleDeleteNote, handleEditNote}) {
    return (
      <Card
        style={{ width: 300, marginTop: 16 }}
        actions={[
          <DeleteOutlined key="delete" onClick={() => handleDeleteNote(note.id)} />,
          <EditOutlined key="edit" onClick={() => handleEditNote(note)} />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Skeleton loading={loading} avatar active>
          <Meta
            avatar={<Avatar src={`${import.meta.env.VITE_BACKEND}/${note.noteImage}`} />}
            title={note.noteTitle}
            description={note.noteDescription}
          />
        </Skeleton>
      </Card>
    );
}

export default NoteCard;
