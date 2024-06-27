export const addNewChecklistData = (checklist) => {
  return fetch(`http://localhost:8088/checklists`, {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(checklist),
  });
};

export const getAllChecklists = () => {
  return fetch("http://localhost:8088/checklists").then((res) => res.json());
};

export const deleteChecklist = (checklistId) => {
  return fetch(`http://localhost:8088/checklists/${checklistId}`, {
    method: "DELETE",
  });
};