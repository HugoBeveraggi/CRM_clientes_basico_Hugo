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
        "footerDeveloped": "{{year}} · Desarrollado con ❤️",
        "views": {
          "kanban": "Tablero",
          "dashboard": "Estadísticas"
        },
        "statsSection": "Estadísticas del pipeline",
        "mainContent": "Contenido Principal"
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
        "lost": "Perdidos",
        "activeClients": "{{count}} activos",
        "activeClientsSub": "clientes activos",
        "conversionSub": "{{rate}}% conversión",
        "lostSub": "cerrados sin éxito",
        "conversionRate": "Tasa de Conversión",
        "wonVsClosed": "ganados / cerrados"
      },
      "dashboard": {
        "successRate": "Tasa de Éxito",
        "wonVsLost": "{{won}} ganados / {{lost}} perdidos",
        "topClients": "Mejores Clientes",
        "noWonClients": "Ningún cliente ganado",
        "totalClients": "Total Clientes",
        "allStages": "En todas las etapas",
        "expectedRevenueByStage": "Ingresos Esperados por Etapa",
        "clientDistribution": "Distribución de Clientes"
      },
      "kanban": {
        "columns": {
          "new": "Nuevos",
          "contacted": "Contactados",
          "proposal": "Propuesta",
          "won": "Ganados",
          "lost": "Perdidos"
        },
        "descriptions": {
          "new": "Clientes recién añadidos",
          "contacted": "En conversación inicial",
          "proposal": "Propuesta formal enviada",
          "won": "Cliente convertido",
          "lost": "Oportunidad cerrada"
        },
        "emptyColumn": "Mueve clientes aquí"
      },
      "timeline": {
        "types": {
          "note": "nota",
          "call": "llamada",
          "email": "email",
          "meeting": "reunión",
          "reminder": "recordatorio"
        },
        "addPlaceholder": "Añadir {{type}}...",
        "add": "Añadir",
        "empty": "No hay actividades registradas.",
        "overdue": "(Atrasado)",
        "delete": "Eliminar"
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
            "notes": "Notas",
            "historyAndReminders": "Historial y Recordatorios"
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
          "delete": "Eliminar",
          "dragCard": "Arrastrar tarjeta",
          "history": "Historial ({{count}})",
          "move": "Mover"
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
        "footerDeveloped": "{{year}} · Developed with ❤️",
        "views": {
          "kanban": "Board",
          "dashboard": "Analytics"
        },
        "statsSection": "Pipeline Statistics",
        "mainContent": "Main Content"
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
        "lost": "Lost",
        "activeClients": "{{count}} active",
        "activeClientsSub": "active clients",
        "conversionSub": "{{rate}}% conversion",
        "lostSub": "unsuccessfully closed",
        "conversionRate": "Conversion Rate",
        "wonVsClosed": "won / closed"
      },
      "dashboard": {
        "successRate": "Success Rate",
        "wonVsLost": "{{won}} won / {{lost}} lost",
        "topClients": "Top Clients",
        "noWonClients": "No won clients",
        "totalClients": "Total Clients",
        "allStages": "Across all stages",
        "expectedRevenueByStage": "Expected Revenue by Stage",
        "clientDistribution": "Client Distribution"
      },
      "kanban": {
        "columns": {
          "new": "New",
          "contacted": "Contacted",
          "proposal": "Proposal",
          "won": "Won",
          "lost": "Lost"
        },
        "descriptions": {
          "new": "Newly added clients",
          "contacted": "In initial conversation",
          "proposal": "Formal proposal sent",
          "won": "Client converted",
          "lost": "Opportunity closed"
        },
        "emptyColumn": "Move clients here"
      },
      "timeline": {
        "types": {
          "note": "note",
          "call": "call",
          "email": "email",
          "meeting": "meeting",
          "reminder": "reminder"
        },
        "addPlaceholder": "Add {{type}}...",
        "add": "Add",
        "empty": "No activities recorded.",
        "overdue": "(Overdue)",
        "delete": "Delete"
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
            "notes": "Notes",
            "historyAndReminders": "History & Reminders"
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
          "delete": "Delete",
          "dragCard": "Drag card",
          "history": "History ({{count}})",
          "move": "Move"
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
