import * as React from "react";
import { useState, useContext } from "react";
import { Email } from "@mui/icons-material";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { MyContext } from "../../context/MyContext";
import { TextField } from "@mui/material";

export default function MessageComponent() {
  const { allUsers, setAllUsers, authenticateUser } = useContext(MyContext);

  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };

    setRows((prevRows) => {
      const updatedRows = prevRows.map((row) =>
        row.id === newRow.id ? updatedRow : row
      );
      setAllUsers([...updatedRows]);
      return updatedRows;
    });

    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: "email",
      headerName: "Email",
      width: 180,
      editable: true,
      flex: 1,
      minWidth: 150,
      renderEditCell: (params) => (
        <TextField
          value={params.value || ""}
          onChange={(event) =>
            params.api.setEditCellValue({
              id: params.id,
              field: params.field,
              value: event.target.value,
            })
          }
          placeholder="Enter email"
          variant="standard"
          fullWidth
        />
      ),
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      minWidth: 150,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Message",
      width: 100,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <GridActionsCellItem
            key={params?.id}
            icon={<Email />}
            label="Edit"
            className="textPrimary"
            onClick={() => sendMesasge(params?.row?.email)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  React.useEffect(() => {
    const filterusers = allUsers?.filter(
      (item) => item?.email !== authenticateUser?.email
    );
    setRows([...filterusers]);
  }, [authenticateUser, allUsers]);

  const [messageEmail, setMessageEmail] = useState(null);
  const sendMesasge = (email) => {
    setMessageEmail(email);
  };

  const msgs = [
    {
      id: 0,
      type: "user",
      message: "Hello! How are you?",
    },
    {
      id: 1,
      type: "me",
      message: "I am fine! I need a help",
    },
    {
      id: 2,
      type: "user",
      message: "Okay! How can i help you? ",
    },
  ];

  const [messages, setMessages] = useState(msgs);
  const [newMessage, setNewMessage] = useState("");
  const sendNewMessage = () => {
    const newMsg = {
      id: messages.length,
      type: "me",
      message: newMessage,
    };
    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  return (
    <div className="w-[380px] lg:w-full">
      {!messageEmail ? (
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
          autoHeight
        />
      ) : (
        <div>
          <div className=" w-full    rounded-md lg:h-[500px]">
            <div className=" w-full border py-2 flex items-center justify-center">
              {messageEmail}
            </div>
            <div className=" p-5 h-full">
              {messages.map((item, indx) =>
                item.type !== "me" ? (
                  <div key={indx} className="flex items-center mb-10 gap-5">
                    <div className="flex items-center px-3 py-[7px] justify-center rounded-full bg-gray-300 text-lg uppercase">
                      {messageEmail?.slice(0, 2)}
                    </div>
                    <p>{item.message}</p>
                  </div>
                ) : (
                  <div
                    key={indx}
                    className="flex flex-col pb-2  justify-end w-full items-end "
                  >
                    <p>{item.message}</p>
                  </div>
                )
              )}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendNewMessage();
              }}
              className=" relative"
            >
              <textarea
                name=""
                id=""
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                rows={5}
                cols={5}
                required
                className=" border p-2 w-full"
              ></textarea>
              <div className=" w-full flex items-center justify-between px-3 z-10">
                <div />
                <div>
                  <button
                    type="submit"
                    className=" rounded-md font-semibold px-4 py-2  text-sm bg-gray-400"
                  >
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
