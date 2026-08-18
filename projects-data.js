/**
 * Daniil Gandapas (Asm-o-Dan) - Portfolio & Engineering Systems Data
 * Clean Architecture, Systems & AI Vector Search
 */

const hrQuickFacts = {
  name: "Даниил Гандапас",
  alias: "Asm-o-Dan",
  role: "Backend & Systems Software Engineer",
  status: "Open for Roles (Remote / Full-time)",
  location: "Тирасполь / Remote (UTC+2 / UTC+3)",
  languages: [
    { name: "Русский", level: "Родной (Native)" },
    { name: "English", level: "B1 / B2 (Technical / Working)" }
  ],
  education: {
    institution: "Тираспольский институт физики и техники (ТИФТ)",
    faculty: "Физико-технический факультет",
    degree: "Инженерия программного обеспечения (Software Engineering)",
    status: "Специалист / Инженер ПО"
  },
  workPreferences: [
    "Удаленная работа (Remote) / Полная занятость",
    "Сложные бэкенд-системы, CQRS, микросервисы, AI-поиск",
    "Продуктовые команды с высокой инженерной культурой"
  ]
};

const timelineData = [
  {
    year: "2024 — Наст. время",
    title: "Архитектура систем & Векторный поиск (AI/NLP)",
    subtitle: "R&D и разработка высоконагруженных сервисов",
    description: "Разработка многослойного движка DrugsEngine на C# с Clean Architecture и CQRS, создание микросервисов интеграции с векторной базой данных Qdrant и семантического анализа интентов.",
    badge: "Enterprise & AI",
    tags: ["C# .NET 8", "Clean Arch", "CQRS", "Qdrant Vector DB", "Python RPC"]
  },
  {
    year: "2023 — 2024",
    title: "Telegram Bot Pipelines & OCR Automation",
    subtitle: "Асинхронные обработчики и распознавание текста",
    description: "Создание отказоустойчивых Telegram-ботов с интеграцией Tesseract OCR, очередей сообщений, машины состояний контекстных диалогов и парсеров данных.",
    badge: "Automation & OCR",
    tags: ["C#", "Tesseract OCR", "Async Pipeline", "State Machine", "PostgreSQL"]
  },
  {
    year: "2022 — 2023",
    title: "Низкоуровневое программирование & Game Loop",
    subtitle: "Системный фундамент на Си",
    description: "Разработка игрового движка Tanks1984 на чистом Си. Глубокое погружение в ручное управление памятью, работу с указателями, структурами данных и детерминированными циклами.",
    badge: "System Core",
    tags: ["Pure C", "Memory Management", "Game Loop", "Data Structures"]
  },
  {
    year: "Академия",
    title: "Тираспольский институт физики и техники (ТИФТ)",
    subtitle: "Программная инженерия (Software Engineering)",
    description: "Фундаментальная подготовка: алгоритмы и структуры данных, высшая математика, теория баз данных, операционные системы и проектирование ПО.",
    badge: "Education",
    tags: ["Algorithms", "Math", "OS Kernels", "RDBMS Theory"]
  }
];

const teamValues = [
  {
    icon: "shield-check",
    title: "100% изоляция и надежность",
    desc: "Покрываю критическую доменную логику тестами (Domain.Tests). Доменная модель чиста от БД и UI."
  },
  {
    icon: "layers",
    title: "Архитектурная дисциплина",
    desc: "Строгое разделение Clean Architecture и CQRS. Команды модифицируют состояние, запросы читают без оверхеда."
  },
  {
    icon: "git-pull-request",
    title: "Прозрачный процесс и Git",
    desc: "Атомарные коммиты, понятные Pull Requests с контекстом и четкая декомпозиция задач."
  },
  {
    icon: "cpu",
    title: "Системный подход к памяти",
    desc: "Понимание работы рантайма, сборщика мусора и железа благодаря корням в чистом Си."
  }
];

const projectsData = [
  {
    id: "drugs-engine",
    title: "DrugsEngine & Vector Search Service",
    shortTitle: "DrugsEngine",
    subtitle: "Enterprise Clean Architecture & Semantic Vector Search",
    category: ["c#", "python", "architecture"],
    stars: 1,
    featured: true,
    accentColor: "cyan",
    metrics: [
      { label: "Архитектура", val: "Clean Arch + CQRS" },
      { label: "Поиск", val: "Qdrant Vector DB" },
      { label: "Тесты", val: "100% Domain Logic" }
    ],
    caseStudy: {
      problem: "Необходимость в отказоустойчивом медицинском бэкенде с семантическим поиском препаратов по симптомам и сложной валидацией рецептурных правил.",
      solution: "Разделение на изолированные слои Domain, Application и Infrastructure с CQRS, вынос NLP-моделей в отдельный Python микросервис и векторное хранилище Qdrant.",
      impact: "100% изоляция доменной модели от БД и фреймворков, мгновенный семантический поиск с фильтрацией по метаданным."
    },
    description: "Многослойный бэкенд на C# с микросервисной интеграцией на Python и векторным поиском в Qdrant. Построен на строгих принципах Clean Architecture и Domain-Driven Design.",
    tags: ["C#", ".NET 8", "Python", "Clean Architecture", "CQRS", "Qdrant", "Domain Tests"],
    githubUrl: "https://github.com/Asm-o-Dan/DrugsEngine",
    pythonServiceUrl: "https://github.com/Asm-o-Dan/DrugsEnginePythonService",
    architecture: {
      pattern: "Clean Architecture + CQRS + Microservice RPC",
      diagram: [
        { id: "domain", name: "01. Domain Layer", tech: "Pure C# (No dependencies)", role: "Сущности, Value Objects, инварианты бизнес-правил, доменные события." },
        { id: "app", name: "02. Application Layer", tech: "CQRS / MediatR / UseCases", role: "Команды модификации, запросы чтения, валидаторы FluentValidation, DTO." },
        { id: "infra", name: "03. Infrastructure", tech: "EF Core / PostgreSQL / RPC", role: "Репозитории, маппинг БД, сетевой клиент к Python AI микросервису." },
        { id: "vector", name: "04. Vector Engine", tech: "Qdrant Vector DB + Python", role: "Генерация векторных эмбеддингов, семантический поиск по симптомам." }
      ],
      details: [
        {
          title: "Domain Invariants & Tests",
          content: "Вся бизнес-логика валидации дозировок, совместимости и сущностей инкапсулирована внутри агрегатов и проверяется юнит-тестами без поднятия БД."
        },
        {
          title: "CQRS Read/Write Separation",
          content: "Команды (Create/Update/Delete) идут через транзакционную модель, а запросы поиска и каталога обрабатываются оптимизированными быстрыми пайплайнами."
        },
        {
          title: "Vector Embeddings & Qdrant",
          content: "Микросервис на Python преобразует текстовые описания в многомерные векторы и индексирует их в Qdrant для семантического поиска с фильтрами."
        }
      ]
    }
  },
  {
    id: "tanks-1984",
    title: "Tanks1984 Game Engine",
    shortTitle: "Tanks1984",
    subtitle: "Deterministic Retro Engine in Pure C",
    category: ["c"],
    stars: 0,
    featured: true,
    accentColor: "emerald",
    metrics: [
      { label: "Язык", val: "Pure ANSI C" },
      { label: "Память", val: "Ручной malloc/free" },
      { label: "FPS", val: "Фиксированный тик" }
    ],
    caseStudy: {
      problem: "Создание быстрого, автономного ретро-игрового движка с минимальным потреблением ресурсов, детерминированной физикой и отсутствием утечек памяти.",
      solution: "Написание чистого Си кода с ручным выделением памяти, детерминированным циклом обновления и прямым буферизированным рендерером.",
      impact: "Нулевой оверхед рантайма, размер бинарника в десятки килобайт, стабильный тик и плавный отклик управления."
    },
    description: "Низкоуровневая реализация аркадного игрового движка на чистом Си. Ручное управление памятью, кастомный рендерер сетки и детерминированная игровая физика.",
    tags: ["C", "Low-level", "Memory Management", "Game Loop", "Retro"],
    githubUrl: "https://github.com/Asm-o-Dan/Tanks1984",
    architecture: {
      pattern: "State Machine + Fixed-Timestep Game Loop",
      diagram: [
        { id: "loop", name: "01. Fixed Game Loop", tech: "Time-delta / Tick Manager", role: "Детерминированный цикл обновления игрового состояния с фиксированным тиком." },
        { id: "entity", name: "02. Entity Component", tech: "Pure C Structs", role: "Структуры для танков, снарядов, карты препятствий и AABB-коллизий." },
        { id: "ai", name: "03. Tank AI & Pathing", tech: "Grid State Search", role: "Автономное поведение вражеских танков и выбор траектории стрельбы." },
        { id: "render", name: "04. Frame Buffer", tech: "Direct Double-Buffer", role: "Прямой буферизированный вывод игрового поля без тяжелых внешних библиотек." }
      ],
      details: [
        {
          title: "Memory Safety & Zero Leaks",
          content: "Строгое следование парным вызовам инициализации и очистки ресурсов, валидация границ массивов и указателей."
        },
        {
          title: "Deterministic Physics",
          content: "Физика снарядов и проверка столкновений происходят с постоянным временным шагом, исключая рассинхронизацию."
        }
      ]
    }
  },
  {
    id: "telegram-ocr-bots",
    title: "Telegram Bot Suite & OCR Pipeline",
    shortTitle: "Telegram OCR",
    subtitle: "Context-Aware Automation & Tesseract OCR Pipeline",
    category: ["c#", "python", "bot"],
    stars: 0,
    featured: true,
    accentColor: "amber",
    metrics: [
      { label: "Пайплайн", val: "Tesseract OCR" },
      { label: "Архитектура", val: "Event-Driven Worker" },
      { label: "Отказоустойчивость", val: "Auto-Reconnect" }
    ],
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
      diagram: [
        { id: "ingest", name: "01. Ingestion Layer", tech: "Telegram.Bot API / Webhooks", role: "Прием сообщений, троттлинг запросов, буферизация очереди." },
        { id: "ocr", name: "02. OCR & Preprocessing", tech: "Tesseract OCR / SkiaSharp", role: "Контрастирование, очистка шумов, извлечение текста из изображений." },
        { id: "state", name: "03. Dialog State Machine", tech: "FSM Context Manager", role: "Маршрутизация пошаговых сценариев диалога пользователя." }
      ],
      details: [
        {
          title: "Resilient Network Layer",
          content: "Автоматическое переподключение с экспоненциальной задержкой при сбоях сетевого шлюза Telegram."
        },
        {
          title: "Image Normalization",
          content: "Предобработка перед подачей в OCR-движок повышает точность распознавания сканов низкого качества."
        }
      ]
    }
  },
  {
    id: "first-api-cqrs",
    title: "Layered REST API & CQRS Core",
    shortTitle: "FirstApi CQRS",
    subtitle: "Clean ASP.NET Core REST API & Database Access",
    category: ["c#", "architecture"],
    stars: 0,
    featured: false,
    accentColor: "cyan",
    metrics: [
      { label: "Стек", val: "ASP.NET Core / EF / Dapper" },
      { label: "БД", val: "PostgreSQL" },
      { label: "Паттерн", val: "CQRS Read/Write" }
    ],
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
      diagram: [
        { id: "endpoints", name: "01. API Endpoints", tech: "ASP.NET Core Controllers", role: "Маршрутизация, Swagger документация, фильтрация запросов." },
        { id: "handlers", name: "02. CQRS Handlers", tech: "Command / Query Split", role: "Изолированные обработчики бизнес-сценариев." },
        { id: "persistence", name: "03. Persistence Layer", tech: "EF Core + Dapper", role: "Транзакции через EF Core, высокоскоростные выборки через Dapper." }
      ],
      details: [
        {
          title: "Dual-ORM Approach",
          content: "EF Core обеспечивает удобство миграций и транзакционную надежность, а Dapper исключает оверхед трекинга сущностей при аналитических запросах."
        }
      ]
    }
  },
  {
    id: "automation-scrapers",
    title: "Automation & Data Sync Engines",
    shortTitle: "Automation",
    subtitle: "Python Automation Scripts & Scrapers",
    category: ["python"],
    stars: 0,
    featured: false,
    accentColor: "emerald",
    metrics: [
      { label: "Стек", val: "Python AsyncIO" },
      { label: "Очереди", val: "Worker Pool" },
      { label: "Экспорт", val: "SQLite / JSON / CSV" }
    ],
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
      diagram: [
        { id: "driver", name: "01. Async HTTP Client", tech: "Aiohttp / Requests", role: "Пул воркеров с ротацией User-Agent и авто-ретраями." },
        { id: "parser", name: "02. Parsing & Schema", tech: "BeautifulSoup / Pydantic", role: "Нормализация и валидация входящих структур." },
        { id: "sink", name: "03. Storage Sink", tech: "SQLite / JSON Engine", role: "Потоковая запись без блокировки основного цикла." }
      ],
      details: [
        {
          title: "Fault-Tolerant Retries",
          content: "Экспоненциальный откат (exponential backoff) при временной недоступности источников данных."
        }
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
    category: "Архитектура & Системы",
    icon: "layers",
    skills: [
      { name: "Clean Architecture", level: 95, detail: "Domain, Application, Infrastructure isolation" },
      { name: "CQRS & Event-Driven", level: 90, detail: "Command/Query segregation, MediatR, Event buses" },
      { name: "Domain-Driven Design", level: 85, detail: "Aggregates, Value Objects, Domain Events" },
      { name: "Microservice RPC", level: 85, detail: "C# ↔ Python inter-service communication" }
    ]
  },
  {
    category: "Базы данных & Векторный AI",
    icon: "database",
    skills: [
      { name: "PostgreSQL", level: 90, detail: "Relational modeling, Constraints, JSONB" },
      { name: "Qdrant (Vector DB)", level: 90, detail: "High-dim embeddings, Cosine search, Payload filters" },
      { name: "EF Core & Dapper", level: 90, detail: "Code-First Migrations, Micro-ORM high-perf queries" },
      { name: "SQLite", level: 85, detail: "Embedded storage, In-memory testing" }
    ]
  },
  {
    category: "Экосистема & Инструменты",
    icon: "cpu",
    skills: [
      { name: "ASP.NET Core", level: 92, detail: "Dependency Injection, Middleware, JWT, WebSockets" },
      { name: "Telegram Bot API", level: 95, detail: "Long polling, Webhooks, FSM dialog manager" },
      { name: "Tesseract OCR", level: 85, detail: "Image preprocessing, Text extraction pipelines" },
      { name: "Docker & Git", level: 88, detail: "Containerization, Multi-stage builds, Clean git history" }
    ]
  }
];

// Virtual Filesystem & Command Definition for Quake CLI
const virtualFS = {
  "/": ["bio.md", "stack.json", "projects/", "contacts.txt", "manifest.txt"],
  "/projects": ["drugs-engine.arch", "tanks-1984.c", "telegram-ocr.bot", "first-api.cqrs"],
  files: {
    "bio.md": "Даниил Гандапас (Asm-o-Dan)\nBackend & Systems Software Engineer\nСпециализация: C# (.NET 8), Python, Clean Architecture, CQRS, Qdrant Vector DB.\nОбразование: ТИФТ (Программная инженерия).\nЛокация: Тирасполь / Remote.",
    "stack.json": JSON.stringify({
      primary: ["C# .NET 8", "Python", "Pure C", "SQL"],
      architecture: ["Clean Architecture", "CQRS", "DDD", "Microservices"],
      ai_and_vector: ["Qdrant Vector DB", "NLP Embeddings", "Tesseract OCR"],
      databases: ["PostgreSQL", "SQLite", "EF Core", "Dapper"]
    }, null, 2),
    "contacts.txt": "Telegram: https://t.me/SomeSimpleTag (@SomeSimpleTag)\nGitHub: https://github.com/Asm-o-Dan\nEmail: dgandapas1@gmail.com",
    "manifest.txt": "“Structure is freedom. Architecture is intention. I don’t just write code — I structure possibility.”",
    "projects/drugs-engine.arch": "Project: DrugsEngine & Python Service\nPattern: Clean Architecture + CQRS + Microservice RPC\nTech: C# .NET 8, Python, Qdrant Vector DB, PostgreSQL\nRepo: https://github.com/Asm-o-Dan/DrugsEngine",
    "projects/tanks-1984.c": "Project: Tanks1984\nPattern: Deterministic Fixed-Timestep Game Loop\nTech: Pure ANSI C, Custom Buffer Renderer, Zero Memory Leaks\nRepo: https://github.com/Asm-o-Dan/Tanks1984",
    "projects/telegram-ocr.bot": "Project: Telegram Bot Suite & OCR\nPattern: Event-Driven Message Pipeline + Worker Pool\nTech: C#, Telegram.Bot API, Tesseract OCR, State Machine\nRepo: https://github.com/Asm-o-Dan/TelegramBot",
    "projects/first-api.cqrs": "Project: Layered REST API & CQRS Core\nPattern: CQRS Read/Write Separation\nTech: ASP.NET Core, EF Core, Dapper, PostgreSQL\nRepo: https://github.com/Asm-o-Dan/FirstApi"
  }
};

if (typeof window !== 'undefined') {
  window.ASM_PORTFOLIO = { hrQuickFacts, timelineData, teamValues, projectsData, skillsData, virtualFS };
}
if (typeof exports !== 'undefined') {
  exports.hrQuickFacts = hrQuickFacts;
  exports.timelineData = timelineData;
  exports.teamValues = teamValues;
  exports.projectsData = projectsData;
  exports.skillsData = skillsData;
  exports.virtualFS = virtualFS;
}
