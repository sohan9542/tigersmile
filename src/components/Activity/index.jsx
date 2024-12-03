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
import { subjects } from "../../assets/subjects";
import { Select, MenuItem } from "@mui/material";

const roles = ["Market", "Finance", "Development"];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      { id, title: "", start: "", end: "", status: "upcoming" },
    ]);

    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button
        color="primary"
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={handleClick}
      >
        Add Activity
      </Button>
    </GridToolbarContainer>
  );
}

export default function ActivityComponent() {
  const { activity, setActivity, notificationsData, setNotificationsData, authenticateUser } =
    useContext(MyContext);
  React.useEffect(() => {
    console.log("activityudated", activity);
  }, [activity]);

  const [rows, setRows] = React.useState(activity);
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
 
    // Access the full array of rows after saving
    setRows((prevRows) => {
      const updatedRows = prevRows.map((row) => {
        if (row.id === id) {
          // Log the row being saved
          console.log("Row being saved: ", row); // Log the row data
          return { ...row }; // Ensure the row is marked as not new
        }

        const newNotification = {
          id: 1,
          title: "New Assignment Available",
          message: `A new assignment has been added to your ${row?.subject} course.`,
          isRead: false,
        };
    
        let notification = [...notificationsData];
        notification.unshift(newNotification);
        setNotificationsData([...notification]);
        // Change the mode to view for the specified row
        setRowModesModel((prevModel) => ({
          ...prevModel,
          [id]: { mode: GridRowModes.View },
        }));
    
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
      setActivity([...updatedRows]);
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
      field: "title",
      headerName: "Activity Name",
      width: 180,
      editable: true,
      flex: 1,
      minWidth: 150,
    },

    {
      field: "start",
      headerName: "Start Date",
      type: "dateTime",
      flex: 1,
      minWidth: 150,
      editable: true,
      fontWeight: 600,
    },
    {
      field: "end",
      headerName: "End Date",
      type: "dateTime",
      flex: 1,
      minWidth: 150,
      editable: true,
      fontWeight: 600,
    },
    {
      field: "subject",
      headerName: "Subject",

      flex: 1,
      minWidth: 150,
      editable: true,
      fontWeight: 600,
      renderEditCell: (params) => {
        return (
          <Select
            value={params.value || ""}
            onChange={(e) =>
              params.api.setEditCellValue({
                id: params.id,
                field: params.field,
                value: e.target.value,
              })
            }
            fullWidth
          >
            {subjects.map((subject) => (
              <MenuItem key={subject.name} value={subject.name}>
                {subject.name}
              </MenuItem>
            ))}
          </Select>
        );
      },
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
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return authenticateUser?.permissions?.canAssignRoles ?[
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ] : [];
      },
    },
  ];

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
      />
    </div>
  );
}
