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
      },
      successCreate: {
        title: "Registro completo",
        message: "La película ha registrado exitosamente",
        dismiss: "cancelar",
        accept: "aceptar"
      },
      errorCreate: {
        title: "Error",
        message: "La película no se puedo registrar correctamente",
        dismiss: "cancelar",
        accept: "aceptar"
      },
      successUpdate: {
        title: "Registro actualizado",
        message: "Los datos de la película se han actualizado exitosamente",
        dismiss: "cancelar",
        accept: "aceptar"
      },
      errorUpdate: {
        title: "Error",
        message: "No se puedo actualizar correctamente los datos de la película",
        dismiss: "cancelar",
        accept: "aceptar"
      }
    }
  }
};
