export default {
  list: {
    title: "Películas"
  },
  edit: {
    title: "Editar película"
  },
  create: {
    title: "Nueva película"
  },
  attributes: {
    name: "Nombre",
    active: "Estatus",
    image: "Imagen",
    duration: "Duración",
    publish_date: "Fecha de publicación",
    created_at: "Fecha de registro",
    updated_at: "Última actualización"
  },
  labels: {
    search: "Buscar",
    add: "agregar",
    submit: "guardar",
    active: "activo",
    inactive: "inactivo",
    dialogs: {
      confirmDelete: {
        title: "¿Eliminar película?",
        message:
          "Se eliminará la película {name}, esta acción no se pude deshacer",
        dismiss: "cancelar",
        accept: "eliminar"
      },
      successDelete: {
        title: "Eliminación completa",
        message: "La película {name} ha sido removido exitosamente",
        dismiss: "cancelar",
        accept: "aceptar"
      }
    }
  }
};
