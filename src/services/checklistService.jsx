export const addNewChecklistData = (checklist) => {
  return fetch(`http://localhost:8088/checklists`, {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(checklist),
  });
};
