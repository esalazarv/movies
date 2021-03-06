export default {
  list: {
    title: "Movies"
  },
  edit: {
    title: "Edit movie"
  },
  create: {
    title: "New movie"
  },
  attributes: {
    name: "Name",
    active: "Status",
    image: "Image",
    duration: "Duration",
    publish_date: "Publish date",
    created_at: "Created at",
    updated_at: "Updated at"
  },
  labels: {
    search: "Search",
    add: "add",
    submit: "save",
    active: "active",
    inactive: "inactive",
    dialogs: {
      confirmDelete: {
        title: "Delete movie?",
        message:
          "This will delete the movie {name}, this action can not be undone",
        dismiss: "disagree",
        accept: "agree"
      },
      successDelete: {
        title: "Deletion success",
        message: "Movie {name} has been removed",
        dismiss: "dismiss",
        accept: "ok"
      },
      successCreate: {
        title: "Register complete",
        message: "Movie has been created successfully",
        dismiss: "cancel",
        accept: "accept"
      },
      errorCreate: {
        title: "Error",
        message: "Movie has not been created",
        dismiss: "cancel",
        accept: "accept"
      },
      successUpdate: {
        title: "Record updated",
        message: "Movie data has been updated successfully",
        dismiss: "cancel",
        accept: "accept"
      },
      errorUpdate: {
        title: "Error",
        message: "Movie data has not been updated",
        dismiss: "cancel",
        accept: "accept"
      }
    }
  }
};
