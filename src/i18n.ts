import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  es: {
    translation: {
      "app": {
        "title": "CRMPro",
        "subtitle": "Pipeline Manager",
        "newClient": "Nuevo cliente",
        "searchPlaceholder": "Buscar clientes, empresas, emails...",
        "pipelineTitle": "Pipeline de ventas",
        "totalClients": "{{count}} clientes en total",
        "showingClients": "Mostrando {{filtered}} de {{total}} clientes",
        "addShortcut": "en cada columna para añadir",
        "footerStorage": "CRMPro · Datos almacenados localmente en tu navegador",
        "footerDeveloped": "{{year}} · Desarrollado con ❤️"
      },
      "header": {
        "searchPlaceholder": "Buscar clientes, empresas, emails...",
        "clearSearch": "Limpiar búsqueda",
        "filters": "Filtros",
        "newClient": "Nuevo cliente",
        "status": "Estado",
        "allStatuses": "Todos los estados",
        "sortBy": "Ordenar por",
        "sortFields": {
          "createdAt": "Fecha creación",
          "name": "Nombre",
          "company": "Empresa",
          "expectedAmount": "Importe"
        },
        "direction": "Dirección",
        "asc": "Ascendente",
        "desc": "Descendente",
        "minAmount": "Importe mín. (€)",
        "maxAmount": "Importe máx. (€)",
        "showing": "{{filtered}} de {{total}} clientes",
        "clearFilters": "Limpiar",
        "themes": {
          "dark": "Oscuro",
          "light": "Claro",
          "orange": "Naranja",
          "frutiger": "Frutiger Aero"
        }
      },
      "stats": {
        "totalClients": "Total Clientes",
        "potentialRevenue": "Ingresos Potenciales",
        "won": "Ganados",
        "lost": "Perdidos"
      },
      "kanban": {
        "columns": {
          "new": "Nuevos",
          "contacted": "Contactados",
          "proposal": "Propuesta",
          "won": "Ganados",
          "lost": "Perdidos"
        },
        "emptyColumn": "Mueve clientes aquí"
      },
      "client": {
        "modal": {
          "titleEdit": "Editar cliente",
          "titleNew": "Nuevo cliente",
          "subtitleEdit": "Editando: {{name}}",
          "subtitleNew": "Completa los datos del cliente",
          "cancel": "Cancelar",
          "saveChanges": "Guardar cambios",
          "create": "Crear cliente",
          "labels": {
            "name": "Nombre completo *",
            "company": "Empresa",
            "phone": "Teléfono",
            "email": "Email",
            "amount": "Importe esperado (€)",
            "status": "Estado",
            "notes": "Notas"
          },
          "placeholders": {
            "name": "Ej: Juan García",
            "company": "Ej: Acme Corp",
            "phone": "+34 600 000 000",
            "email": "email@empresa.com",
            "notes": "Información adicional sobre el cliente..."
          },
          "errors": {
            "nameRequired": "El nombre es obligatorio",
            "emailInvalid": "Formato de email inválido",
            "amountNegative": "El importe no puede ser negativo"
          }
        },
        "card": {
          "edit": "Editar",
          "delete": "Eliminar"
        }
      }
    }
  },
  en: {
    translation: {
      "app": {
        "title": "CRMPro",
        "subtitle": "Pipeline Manager",
        "newClient": "New client",
        "searchPlaceholder": "Search clients, companies, emails...",
        "pipelineTitle": "Sales Pipeline",
        "totalClients": "{{count}} total clients",
        "showingClients": "Showing {{filtered}} of {{total}} clients",
        "addShortcut": "in each column to add",
        "footerStorage": "CRMPro · Data stored locally in your browser",
        "footerDeveloped": "{{year}} · Developed with ❤️"
      },
      "header": {
        "searchPlaceholder": "Search clients, companies, emails...",
        "clearSearch": "Clear search",
        "filters": "Filters",
        "newClient": "New client",
        "status": "Status",
        "allStatuses": "All statuses",
        "sortBy": "Sort by",
        "sortFields": {
          "createdAt": "Creation date",
          "name": "Name",
          "company": "Company",
          "expectedAmount": "Amount"
        },
        "direction": "Direction",
        "asc": "Ascending",
        "desc": "Descending",
        "minAmount": "Min amount (€)",
        "maxAmount": "Max amount (€)",
        "showing": "{{filtered}} of {{total}} clients",
        "clearFilters": "Clear",
        "themes": {
          "dark": "Dark",
          "light": "Light",
          "orange": "Orange",
          "frutiger": "Frutiger Aero"
        }
      },
      "stats": {
        "totalClients": "Total Clients",
        "potentialRevenue": "Potential Revenue",
        "won": "Won",
        "lost": "Lost"
      },
      "kanban": {
        "columns": {
          "new": "New",
          "contacted": "Contacted",
          "proposal": "Proposal",
          "won": "Won",
          "lost": "Lost"
        },
        "emptyColumn": "Move clients here"
      },
      "client": {
        "modal": {
          "titleEdit": "Edit client",
          "titleNew": "New client",
          "subtitleEdit": "Editing: {{name}}",
          "subtitleNew": "Fill in the client details",
          "cancel": "Cancel",
          "saveChanges": "Save changes",
          "create": "Create client",
          "labels": {
            "name": "Full name *",
            "company": "Company",
            "phone": "Phone",
            "email": "Email",
            "amount": "Expected amount (€)",
            "status": "Status",
            "notes": "Notes"
          },
          "placeholders": {
            "name": "Ex: John Doe",
            "company": "Ex: Acme Corp",
            "phone": "+1 555 000 000",
            "email": "email@company.com",
            "notes": "Additional information about the client..."
          },
          "errors": {
            "nameRequired": "Name is required",
            "emailInvalid": "Invalid email format",
            "amountNegative": "Amount cannot be negative"
          }
        },
        "card": {
          "edit": "Edit",
          "delete": "Delete"
        }
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
