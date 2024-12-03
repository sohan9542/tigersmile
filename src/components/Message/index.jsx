import * as React from "react";
import { useState } from "react";
import { useContext } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Email, EmojiEmotions } from "@mui/icons-material";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import { MyContext } from "../../mangement/Mycontext";
import { TextField, Select, MenuItem } from "@mui/material";
import { useLocation, useParams, useRoutes } from "react-router-dom";

export default function MessageComponent() {
  const { allUsers, setAllUsers, authenticateUser } = useContext(MyContext);

  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  // this function handle the event of editing stop
  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  // when we click on edit button this function happens
  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  // clicking on save this function responsible
  const handleSaveClick = (id) => () => {
    // Change the mode to view for the specified row
    setRowModesModel((prevModel) => ({
      ...prevModel,
      [id]: { mode: GridRowModes.View },
    }));

    // Access the full array of rows after saving
    setRows((prevRows) => {
      const updatedRows = prevRows.map((row) => {
        if (row.id === id) {
          // Log the row being saved
          console.log("Row being saved: ", row); // Log the row data
          return { ...row }; // Ensure the row is marked as not new
        }
        return row;
      });

      return updatedRows;
    });
  };

  // for deleteing we are using this
  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  // for cancel the edit mode we are using this
  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };
  // after updateing a row this function get called
  const processRowUpdate = (newRow) => {
    // Here, ensure you're including all necessary fields
    const updatedRow = { ...newRow, isNew: false };

    setRows((prevRows) => {
      const updatedRows = prevRows.map((row) =>
        row.id === newRow.id ? updatedRow : row
      );
      console.log("Updated Rows on Save: ", updatedRows); // Log the updated rows
      setAllUsers([...updatedRows]);
      return updatedRows;
    });

    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  // table header & column defined
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
          value={params.value || ""} // Use params.value for the input value
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
    console.log(filterusers, authenticateUser);
    setRows([...filterusers]);
  }, [authenticateUser, allUsers]);

  //   ---------------------message ---------------------

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
    let copyMsg = [];
    const newMsg = {
      id: messages.length,
      type: "me",
      message: newMessage,
    };
    console.log(messages);
    copyMsg = [...messages, newMsg];
    setMessages([...copyMsg]);
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
                 <div className="flex flex-col pb-2  justify-end w-full items-end ">
                   <p >{item.message}</p>
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
                <div>
                  {/* <EmojiEmotions className=" cursor-pointer" /> */}
                </div>
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
