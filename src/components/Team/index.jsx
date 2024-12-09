import * as React from "react";
import { useContext } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
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

function EditToolbar(props) {
  const { authenticateUser } = useContext(MyContext);


  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        title: "Enter title",
        start: "Enter start",
        end: "Enter end",
        isNew: true
      }
    ]);

    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "title" },
    }));
  };

  return (
    <GridToolbarContainer>
      {authenticateUser?.permissions?.canAssignRoles && <Button color="primary" variant="outlined" startIcon={<AddIcon />} onClick={handleClick}>
        Add
      </Button>}
    </GridToolbarContainer>
  );
}

export default function TeamComponent() {
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
      field: "name",
      headerName: "Name",
      width: 180,
      editable: true,
      flex: 1,
      minWidth: 150,
      renderEditCell: (params) => (
        <TextField
          value={params.value || ''}  // Use params.value for the input value
          onChange={(event) => params.api.setEditCellValue({ id: params.id, field: params.field, value: event.target.value })}
          placeholder="Enter Name"
          variant="standard"
          fullWidth
        />
      )
    },
    {
      field: "email",
      headerName: "Email",
      width: 180,
      editable: true,
      flex: 1,
      minWidth: 150,
      renderEditCell: (params) => (
        <TextField
          value={params.value || ''}  // Use params.value for the input value
          onChange={(event) => params.api.setEditCellValue({ id: params.id, field: params.field, value: event.target.value })}
          placeholder="Enter email"
          variant="standard"
          fullWidth
        />
      )
    },
    {
      field: "password",
      headerName: "Password",
      flex: 1,
      minWidth: 150,
      editable: true,
      renderEditCell: (params) => (
        <TextField
          value={params.value || ''}  // Use params.value for the input value
          onChange={(event) => params.api.setEditCellValue({ id: params.id, field: params.field, value: event.target.value })}
          placeholder="Enter password"
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
      renderEditCell: (params) => (
        <Select
          value={params.value || ''}  // Use params.value for the Select component
          onChange={(event) => params.api.setEditCellValue({ id: params.id, field: params.field, value: event.target.value })}
          variant="standard"
          fullWidth
          sx={{
            height: "32px",  // Adjust height as needed
            "& .MuiSelect-select": {
              display: "flex",
              alignItems: "center",
            },
          }}
        >
          <MenuItem value="admin">admin</MenuItem>
          <MenuItem value="manager">manager</MenuItem>
          <MenuItem value="observer">observer</MenuItem>
          <MenuItem value="viewer">viewer</MenuItem>
          <MenuItem value="support">support</MenuItem>
          <MenuItem value="focus">focus</MenuItem>
        </Select>
      ),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={id}
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={id}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return authenticateUser?.permissions?.canAssignRoles ? [
          <GridActionsCellItem
            key={id}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={id}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ] : [];
      },
    },
  ];


  React.useEffect(() => {
    const filterusers = allUsers?.filter((item) => item?.email !== authenticateUser?.email)
    console.log(filterusers, authenticateUser)
    setRows([...filterusers])
  }, [authenticateUser, allUsers])

  return (
    <div className="w-[380px] lg:w-full">
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        autoHeight
      />
    </div>
  );
}
