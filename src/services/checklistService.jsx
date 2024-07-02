export const addNewChecklistData = (checklist) => {
  return fetch(`http://localhost:8088/checklists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(checklist),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data.id;
    });
};

export const getChecklistsByUserId = (userId) => {
  return fetch(`http://localhost:8088/checklists?userId=${userId}`).then(
    (res) => res.json()
  );
};

export const getChecklistsById = (checklistId) => {
  return fetch(`http://localhost:8088/checklists/${checklistId}`).then((res) =>
    res.json()
  );
};

export const deleteChecklist = (checklistId) => {
  return fetch(`http://localhost:8088/checklists/${checklistId}`, {
    method: "DELETE",
  });
};
