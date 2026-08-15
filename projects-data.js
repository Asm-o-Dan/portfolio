/**
 * Daniil Gandapas (Asm-o-Dan) - Portfolio & HR Data
 */
const hrQuickFacts = {
  name: "Даниил Гандапас",
  role: "Backend & Systems Software Engineer",
  status: "Открыт к предложениям (Full-time / Remote)",
  location: "Тирасполь / Remote",
  languages: [
    { name: "Русский", level: "Родной (Native)" },
    { name: "English", level: "B1 / B2 (Technical / Working)" }
  ],
  education: {
    institution: "Тираспольский институт физики и техники (ТИФТ)",
    degree: "Инженерия программного обеспечения (Software Engineering)",
    status: "Студент / Выпускник профильного направления"
  },
  workPreferences: [
    "Удаленная работа (Remote) / Полная занятость",
    "Гибридный формат или релокация (обсуждаемо)",
    "Сложные бэкенд-системы, CQRS, микросервисы, AI-поиск"
  ]
};

const timelineData = [
  {
    period: "2024 — Настоящее время",
    title: "Архитектура систем & Векторный поиск (AI/NLP)",
    subtitle: "R&D и разработка высоконагруженных сервисов",
    description: "Разработка многослойного движка DrugsEngine на C# с Clean Architecture и CQRS, создание микросервисов интеграции с векторной базой данных Qdrant и семантического анализа интентов.",
    badge: "Key Milestone"
  },
  {
    period: "2023 — 2024",
    title: "Telegram Bot Pipelines & OCR Automation",
    subtitle: "Асинхронные обработчики и распознавание текста",
    description: "Создание отказоустойчивых Telegram-ботов с интеграцией Tesseract OCR, очередей сообщений, машины состояний контекстных диалогов и парсеров данных.",
    badge: "Automation"
  },
  {
    period: "2022 — 2023",
    title: "Низкоуровневое программирование & Game Loop",
    subtitle: "Системный фундамент на Си",
    description: "Разработка игрового движка Tanks1984 на чистом Си. Глубокое погружение в ручное управление памятью, работу с указателями, структурами данных и детерминированными циклами.",
    badge: "Foundations"
  },
  {
    period: "Обучение",
    title: "Тираспольский институт физики и техники",
    subtitle: "Программная инженерия (Software Engineering)",
    description: "Фундаментальная подготовка: алгоритмы и структуры данных, высшая математика, теория баз данных, операционные системы и проектирование ПО.",
    badge: "Education"
  }
];

const teamValues = [
  {
    icon: "code",
    title: "Чистота и читаемость кода",
    desc: "Пишу код, который легко понимать, тестировать и масштабировать другим разработчикам в команде. Соблюдаю SOLID, DRY и соглашения команды."
  },
  {
    icon: "shield-check",
    title: "100% предсказуемость & Тесты",
    desc: "Покрываю критическую доменную логику тестами (Domain.Tests). Считаю, что надежный бэкенд не должен падать на граничных значениях."
  },
  {
    icon: "git-pull-request",
    title: "Прозрачный процесс и Git",
    desc: "Атомарные коммиты, понятные Pull Request с описанием контекста, четкая декомпозиция задач и регулярный статус-апдейт."
  },
  {
    icon: "sparkles",
    title: "Фокус на бизнес-результате",
    desc: "Не изобретаю избыточных абстракций ради абстракций. Выбираю стек и архитектурный паттерн под конкретную задачу продукта."
  }
];

const projectsData = [
  {
    id: "drugs-engine",
    title: "DrugsEngine & Python Service",
    subtitle: "Enterprise Clean Architecture & Semantic Vector Search",
    category: ["c#", "python", "architecture"],
    stars: 1,
    featured: true,
    caseStudy: {
      problem: "Необходимость в высоконадежном бэкенде с гибкой бизнес-логикой и быстрым семантическим поиском по неструктурированным данным.",
      solution: "Разделение на изолированные слои Domain, Application и Infrastructure с CQRS, вынос NLP-моделей в отдельный Python микросервис и векторное хранилище Qdrant.",
      impact: "100% изоляция доменной модели от БД и фреймворков, мгновенный семантический поиск с фильтрацией по метаданным."
    },
    description: "Многослойный бэкенд на C# с микросервисной интеграцией на Python и векторным поиском в Qdrant. Построен на строгих принципах Clean Architecture и Domain-Driven Design.",
    tags: ["C#", ".NET 8", "Python", "Clean Architecture", "CQRS", "Qdrant", "Domain Tests"],
    githubUrl: "https://github.com/Asm-o-Dan/DrugsEngine",
    pythonServiceUrl: "https://github.com/Asm-o-Dan/DrugsEnginePythonService",
    architecture: {
      pattern: "Clean Architecture + CQRS + Microservice RPC",
      layers: [
        { name: "Domain Layer", description: "Сущности, Value Objects, инварианты бизнес-правил, доменные события без внешних зависимостей." },
        { name: "Application Layer", description: "Use Cases, команды модификации и запросы выборки (CQRS), DTO и пайплайн валидации." },
        { name: "Infrastructure & Vector DB", description: "Интеграция с PostgreSQL, Qdrant Vector DB и Python сервисом векторного поиска." }
      ],
      highlights: [
        "Полная изоляция доменной модели с 100% покрытием Domain.Tests",
        "Семантический поиск по векторным эмбеддингам через Qdrant",
        "Асинхронное взаимодействие микросервисов C# <-> Python"
      ]
    }
  },
  {
    id: "tanks-1984",
    title: "Tanks1984",
    subtitle: "Retro Game Engine in Pure C",
    category: ["c"],
    stars: 0,
    featured: true,
    caseStudy: {
      problem: "Создание быстрого и автономного игрового движка с минимальным потреблением памяти и стабильным FPS на любых устройствах.",
      solution: "Написание чистого Си кода с ручным выделением памяти, детерминированным циклом обновления и буферизированным рендерером.",
      impact: "Нулевой оверхед по памяти, бинарник размером в десятки килобайт, плавная игровая физика."
    },
    description: "Низкоуровневая реализация аркадного игрового движка на чистом Си. Ручное управление памятью, кастомный рендерер сетки и детерминированная игровая физика.",
    tags: ["C", "Low-level", "Memory Management", "Game Loop", "Retro"],
    githubUrl: "https://github.com/Asm-o-Dan/Tanks1984",
    architecture: {
      pattern: "State Machine + Fixed-Timestep Game Loop",
      layers: [
        { name: "Core Loop", description: "Детерминированный цикл обновления игрового состояния с фиксированным тиком времени." },
        { name: "Entity Component", description: "Легковесные структуры C для танков, снарядов, препятствий и просчета коллизий." },
        { name: "Renderer Buffer", description: "Прямой буферизированный вывод игрового поля в терминал/окно без тяжелых зависимостей." }
      ],
      highlights: [
        "Отсутствие утечек памяти благодаря строгому контролю жизненного цикла структур",
        "Минималистичный размер бинарника и мгновенный запуск",
        "Алгоритмы трассировки препятствий и ИИ вражеских танков"
      ]
    }
  },
  {
    id: "telegram-ocr-bots",
    title: "Telegram Bot Suite (OCR & Context)",
    subtitle: "Context-Aware Automation & Tesseract OCR Pipeline",
    category: ["c#", "python", "bot"],
    stars: 0,
    featured: true,
    caseStudy: {
      problem: "Необходимость автоматической обработки входящих сканов документов и контекстной маршрутизации диалогов пользователей в Telegram.",
      solution: "Асинхронный воркер-пайплайн с предварительной обработкой изображений и оптическим распознаванием через Tesseract OCR.",
      impact: "Автоматизация распознавания текстов с документов за секунды, отказоустойчивость при сетевых сбоях."
    },
    description: "Серия ботов для Telegram (TelegramBot, endWorTGBot) с конвейером оптического распознавания текста (Tesseract OCR), маршрутизацией состояний и асинхронной обработкой медиафайлов.",
    tags: ["C#", "Telegram.Bot API", "Tesseract OCR", "Async Pipeline", "State Machine"],
    githubUrl: "https://github.com/Asm-o-Dan/TelegramBot",
    extraRepoUrl: "https://github.com/Asm-o-Dan/endWorTGBot",
    architecture: {
      pattern: "Event-Driven Message Pipeline + Worker Pool",
      layers: [
        { name: "Ingestion Layer", description: "Асинхронный прием вебхуков / Long Polling с троттлингом и очередью сообщений." },
        { name: "OCR & NLP Filter", description: "Предобработка изображений, нормализация контраста, распознавание через Tesseract." },
        { name: "Dialog Manager", description: "Машина состояний контекстных диалогов пользователей." }
      ],
      highlights: [
        "Надежная обработка сбоев соединения и автоматический реконнект",
        "Высокая скорость распознавания текста на лету с фильтрацией шумов",
        "Модульная структура для легкого добавления новых сценариев"
      ]
    }
  },
  {
    id: "first-api-cqrs",
    title: "Layered REST API & CQRS Core",
    subtitle: "Clean ASP.NET Core REST API & Database Access",
    category: ["c#", "architecture"],
    stars: 0,
    featured: false,
    caseStudy: {
      problem: "Создание масштабируемой базы для корпоративного бэкенда с быстрым чтением и безопасной записью.",
      solution: "Разделение логики по CQRS: EF Core для транзакций модификации, Dapper для высокопроизводительных выборок.",
      impact: "Увеличение скорости выборки данных в 3-5 раз по сравнению со стандартным ORM, чистая кодовая база."
    },
    description: "Надежный шаблон RESTful API сервиса на ASP.NET Core с интеграцией Entity Framework Core, Dapper для высокопроизводительных выборок и поддержкой паттерна CQRS.",
    tags: ["ASP.NET Core", "C#", "EF Core", "Dapper", "PostgreSQL", "REST API"],
    githubUrl: "https://github.com/Asm-o-Dan/FirstApi",
    extraRepoUrl: "https://github.com/Asm-o-Dan/EduProject",
    architecture: {
      pattern: "Layered Architecture + CQRS Read/Write Separation",
      layers: [
        { name: "Controllers / Endpoints", description: "REST API маршруты с автоматической документацией Swagger и валидацией." },
        { name: "Services & Handlers", description: "Разделение логики на обработчики команд модификации и быстрых запросов чтения." },
        { name: "Persistence (EF + Dapper)", description: "EF Core для комплексных бизнес-транзакций, Dapper для оптимизированных SQL-запросов." }
      ],
      highlights: [
        "Разделение ответственности Read/Write моделей",
        "Транзакционная целостность и безопасные миграции БД",
        "Глобальный middleware обработки исключений"
      ]
    }
  },
  {
    id: "automation-scrapers",
    title: "Automation & Data Sync Engines",
    subtitle: "Python Automation Scripts & Scrapers",
    category: ["python"],
    stars: 0,
    featured: false,
    caseStudy: {
      problem: "Необходимость регулярного сбора и синхронизации данных из внешних источников без блокировок и потерь пакетов.",
      solution: "Пул асинхронных воркеров на AsyncIO с ротацией сессий и экспортом в реляционные и файловые хранилища.",
      impact: "Полная автоматизация рутинных задач синхронизации с авто-ретраями."
    },
    description: "Комплекс утилит автоматизации процессов (DzenAuto, DiscordLiker, Practice2025) для сбора данных, эмуляции взаимодействия и фоновой синхронизации.",
    tags: ["Python", "Automation", "Web Scraping", "AsyncIO", "Data Sync"],
    githubUrl: "https://github.com/Asm-o-Dan/DzenAuto",
    extraRepoUrl: "https://github.com/Asm-o-Dan/DiscordLiker",
    architecture: {
      pattern: "Job Queue + Async Worker Pattern",
      layers: [
        { name: "Driver / Client", description: "Асинхронные HTTP-клиенты с пулом прокси и ротацией User-Agent." },
        { name: "Parser & Validator", description: "Извлечение структурированных данных и валидация схемы." },
        { name: "Storage Exporter", description: "Экспорт в SQLite / JSON / CSV с дедупликацией." }
      ],
      highlights: [
        "Устойчивость к сетевым задержкам и блокировкам (exponential backoff)",
        "Параллельная обработка очередей задач",
        "Минимальное потребление системных ресурсов"
      ]
    }
  }
];

const skillsData = [
  {
    category: "Языки программирования",
    icon: "code-2",
    skills: [
      { name: "C# (.NET 8/9)", level: 95, detail: "Async/Await, LINQ, Memory<T>, Generic Host, Reflection" },
      { name: "Python", level: 90, detail: "FastAPI, AsyncIO, PyTorch/NLP, Scraping, Scripts" },
      { name: "C (Low-Level)", level: 80, detail: "Pointers, Structs, Memory Alloc, Deterministic logic" },
      { name: "SQL", level: 85, detail: "PostgreSQL, Indexes, Joins, Complex Aggregations" }
    ]
  },
  {
    category: "Архитектура & Паттерны",
    icon: "layers",
    skills: [
      { name: "Clean Architecture", level: 95, detail: "Domain, Application, Infrastructure separation" },
      { name: "CQRS & Event-Driven", level: 90, detail: "Command/Query segregation, MediatR, Event buses" },
      { name: "Domain-Driven Design", level: 85, detail: "Aggregates, Value Objects, Domain Events" },
      { name: "Microservices & RPC", level: 85, detail: "Multi-service communication, Vector DB integration" }
    ]
  },
  {
    category: "Базы данных & Векторные БД",
    icon: "database",
    skills: [
      { name: "PostgreSQL", level: 90, detail: "Relational modeling, Constraints, JSONB" },
      { name: "Qdrant (Vector DB)", level: 90, detail: "High-dim embeddings, Cosine search, Payload filters" },
      { name: "SQLite", level: 85, detail: "Embedded storage, In-memory testing, Fast queries" },
      { name: "EF Core & Dapper", level: 90, detail: "Code-First Migrations, Micro-ORM high-perf queries" }
    ]
  },
  {
    category: "Инструменты & Экосистема",
    icon: "cpu",
    skills: [
      { name: "ASP.NET Core", level: 92, detail: "Dependency Injection, Middleware, JWT, WebSockets" },
      { name: "Telegram Bot API", level: 95, detail: "Long polling, Webhooks, Inline keyboards, Media" },
      { name: "Tesseract OCR", level: 85, detail: "Image preprocessing, Text extraction pipelines" },
      { name: "Git & Docker", level: 88, detail: "Containerization, Multi-stage builds, Branching" }
    ]
  }
];

if (typeof window !== 'undefined') {
  window.ASM_PORTFOLIO = { hrQuickFacts, timelineData, teamValues, projectsData, skillsData };
}
if (typeof exports !== 'undefined') {
  exports.hrQuickFacts = hrQuickFacts;
  exports.timelineData = timelineData;
  exports.teamValues = teamValues;
  exports.projectsData = projectsData;
  exports.skillsData = skillsData;
}
