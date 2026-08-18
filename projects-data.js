/**
 * AsmODan — Cyber-Occult Grimoire & Arcane Systems Data
 * "Structure is freedom. Architecture is intention. I am the demon of low-level memory and architectural order."
 */

const characterSheet = {
  name: "Даниил Гандапас",
  alias: "AsmODan (Asm-o-Dan)",
  title: "Level 20 Systems Archmage & Backend Sorcerer",
  subtitle: "C# / .NET 8 • Clean Architecture • CQRS • Qdrant Vector DB • Pure ANSI C",
  alignment: "Lawful Neutral (Strict Invariants, Isolated Domain, Zero Memory Leaks)",
  manifesto: "“Низкоуровневый код — это древние руны прямого управления материей. Архитектура домена — это защитный ритуальный круг, не пропускающий скверну внешних библиотек. А векторный поиск — высшая школа прорицания в многомерном астрале эмбеддингов.”",
  spellcasting: {
    class: "Systems Wizard / Backend Sorcerer",
    spellAbility: "Intelligence (INT)",
    spellSaveDC: 19,
    spellAttackBonus: "+11"
  },
  stats: [
    { code: "STR", name: "Strength", score: 18, mod: "+4", desc: "Low-Level C, Pointers, Manual Memory Allocation & Hardware Mastery" },
    { code: "DEX", name: "Dexterity", score: 18, mod: "+4", desc: "High-Throughput AsyncIO Pipelines, Event Loops & Fast Response Ticks" },
    { code: "CON", name: "Constitution", score: 20, mod: "+5", desc: "100% Domain Test Coverage, Fault-Tolerance & Zero Downtime" },
    { code: "INT", name: "Intelligence", score: 20, mod: "+5", desc: "Clean Architecture, CQRS, DDD & Layered System Decomposition" },
    { code: "WIS", name: "Wisdom", score: 19, mod: "+4", desc: "High-Dim Vector Embeddings, Qdrant Scrying & NLP Intention" },
    { code: "CHA", name: "Charisma", score: 17, mod: "+3", desc: "Transparent Git Workflow, Clear PRs & Engineering Culture" }
  ],
  equippedItems: [
    {
      slot: "mainhand",
      slotName: "Main Hand",
      icon: "sword",
      itemName: "Blade of Clean Architecture",
      itemType: "Legendary Artifact",
      projectId: "drugs-engine",
      bonus: "+5 to Domain Isolation",
      desc: "Многослойный бэкенд DrugsEngine с полной изоляцией домена от БД и фреймворков."
    },
    {
      slot: "offhand",
      slotName: "Off Hand",
      icon: "book-open",
      itemName: "Tome of CQRS & MediatR",
      itemType: "Arcane Grimoire",
      projectId: "first-api-cqrs",
      bonus: "+4 to Read/Write Segregation",
      desc: "Паттерн CQRS: EF Core для безопасных транзакций, Dapper для высокоскоростных выборок."
    },
    {
      slot: "head",
      slotName: "Helm",
      icon: "eye",
      itemName: "The Astral Eye of Qdrant",
      itemType: "Divination Relic",
      projectId: "drugs-engine",
      bonus: "+5 to 1536-dim Semantic Vision",
      desc: "Семантическое сканирование векторного пространства по косинусному расстоянию."
    },
    {
      slot: "armor",
      slotName: "Armor",
      icon: "shield",
      itemName: "Carapace of Pure ANSI C",
      itemType: "Ancient Armor",
      projectId: "tanks-1984",
      bonus: "Immunity to Memory Leaks & GC Overhead",
      desc: "Движок Tanks1984 на чистом Си с ручным управлением памятью и детерминированным тиком."
    },
    {
      slot: "ring",
      slotName: "Ring",
      icon: "camera",
      itemName: "Signet of Optical Sight",
      itemType: "Conjuration Ring",
      projectId: "telegram-ocr-bots",
      bonus: "+4 to Document Text Extraction",
      desc: "Асинхронные воркеры с конвейером предобработки и оптическим распознаванием Tesseract OCR."
    },
    {
      slot: "belt",
      slotName: "Belt Scroll",
      icon: "scroll",
      itemName: "Scroll of Infinite Knowledge (CV)",
      itemType: "HR Fast-Track Scroll",
      action: "download-cv",
      bonus: "Instant 3-sec Screening & PDF Export",
      desc: "Официальное резюме Даниила Гандапаса со всеми контактами и опытом."
    }
  ],
  spells: [
    { name: "clean-arch", level: "Cantrip", school: "Abjuration", desc: "Воздвигает непроницаемый ритуальный круг вокруг доменной модели, блокируя проникновение внешних зависимостей и БД." },
    { name: "vector-search", level: "Lvl 5", school: "Divination", desc: "Проводит семантическое сканирование 1536-мерного векторного пространства Qdrant по косинусному расстоянию." },
    { name: "malloc-free", level: "Lvl 4", school: "Transmutation", desc: "Напрямую манипулирует системной памятью на чистом Си без рантайм-оверхеда и сборщика мусора." },
    { name: "banish-bug", level: "Lvl 3", school: "Abjuration", desc: "Призывает свод юнит-тестов (Domain.Tests), изгоняя любые граничные баги и runtime-исключения." },
    { name: "async-pipeline", level: "Lvl 4", school: "Conjuration", desc: "Создает неблокирующий пул асинхронных воркеров с OCR-распознаванием документов через Tesseract." }
  ]
};

const hrQuickFacts = {
  name: "Даниил Гандапас",
  alias: "AsmODan",
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
    status: "Дипломированный инженер ПО"
  },
  workPreferences: [
    "Удаленная работа (Remote) / Полная занятость",
    "Сложные бэкенд-системы, CQRS, микросервисы, AI-поиск",
    "Инженерные команды с фокусом на надежность и архитектуру"
  ]
};

const timelineData = [
  {
    year: "2024 — Наст. время",
    title: "Школа Прорицания & Чистая Архитектура",
    subtitle: "DrugsEngine & Qdrant Vector Search",
    description: "Разработка многослойного бэкенда на C# с Clean Architecture, CQRS и микросервисной интеграцией векторной базы данных Qdrant для семантического поиска препаратов.",
    badge: "Abjuration & Divination",
    tags: ["C# .NET 8", "Clean Arch", "CQRS", "Qdrant Vector DB", "Python RPC"]
  },
  {
    year: "2023 — 2024",
    title: "Школа Призыва & Оптическое Зрение",
    subtitle: "Telegram Bot Suite & Tesseract OCR",
    description: "Создание отказоустойчивых Telegram-ботов с конвейером предобработки изображений, оптическим распознаванием Tesseract OCR и асинхронными воркерами.",
    badge: "Conjuration & Vision",
    tags: ["C#", "Tesseract OCR", "Async Pipeline", "FSM State Machine"]
  },
  {
    year: "2022 — 2023",
    title: "Школа Трансмутации Материи & Памяти",
    subtitle: "Tanks1984 Game Engine на чистом Си",
    description: "Разработка детерминированного игрового движка на чистом Си. Ручное управление памятью (malloc/free), структуры данных и буферизованный рендерер без внешних библиотек.",
    badge: "Transmutation & Pure C",
    tags: ["Pure C", "Memory Management", "Game Loop", "Zero Leaks"]
  },
  {
    year: "Академия Магии",
    title: "Тираспольский институт физики и техники (ТИФТ)",
    subtitle: "Программная инженерия (Software Engineering)",
    description: "Фундаментальная подготовка: структуры данных и алгоритмы, высшая математика, теория баз данных, системное программирование и архитектура ПО.",
    badge: "Arcane Foundations",
    tags: ["Algorithms", "Math", "OS Kernels", "RDBMS Theory"]
  }
];

const teamValues = [
  {
    icon: "shield-check",
    title: "100% Защитный круг (Domain Tests)",
    desc: "Доменное ядро изолировано от БД и внешних фреймворков. Критические инварианты покрыты тестами."
  },
  {
    icon: "layers",
    title: "Архитектурный закон (Clean Arch + CQRS)",
    desc: "Строгое разграничение ответственности. Команды модифицируют состояние, запросы читают без лишнего оверхеда."
  },
  {
    icon: "git-pull-request",
    title: "Прозрачный ритуал Git",
    desc: "Атомарные коммиты, понятные Pull Requests с подробным контекстом и дисциплина версионирования."
  },
  {
    icon: "cpu",
    title: "Понимание аппаратной материи",
    desc: "Глубокое понимание работы рантайма, сборщика мусора и памяти процессора благодаря корням в чистом Си."
  }
];

const projectsData = [
  {
    id: "drugs-engine",
    title: "DrugsEngine & Qdrant Astral Search",
    shortTitle: "DrugsEngine",
    subtitle: "Enterprise Clean Architecture & Semantic Vector Scrying",
    school: "Abjuration & Divination",
    category: ["c#", "python", "architecture"],
    stars: 1,
    featured: true,
    accentColor: "cyan",
    metrics: [
      { label: "Круг защиты", val: "Clean Arch + CQRS" },
      { label: "Око прорицания", val: "Qdrant Vector DB" },
      { label: "Печать чистоты", val: "100% Domain Logic" }
    ],
    caseStudy: {
      problem: "Необходимость в отказоустойчивом бэкенде со сложными медицинскими инвариантами и быстрым семантическим поиском по неструктурированным симптомам.",
      solution: "Разделение на изолированные концентрические слои Domain, Application и Infrastructure с CQRS, вынос эмбеддингов в Python микросервис и векторную БД Qdrant.",
      impact: "100% изоляция доменной модели от БД и библиотек, субсекундный семантический поиск с фильтрацией по метаданным."
    },
    description: "Многослойный бэкенд на C# с микросервисной интеграцией на Python и векторным поиском в Qdrant. Построен на строгих принципах Clean Architecture и Domain-Driven Design.",
    tags: ["C#", ".NET 8", "Python", "Clean Architecture", "CQRS", "Qdrant", "Domain Tests"],
    githubUrl: "https://github.com/Asm-o-Dan/DrugsEngine",
    pythonServiceUrl: "https://github.com/Asm-o-Dan/DrugsEnginePythonService",
    architecture: {
      pattern: "Clean Architecture + CQRS + Microservice RPC",
      diagram: [
        { id: "domain", name: "01. Inner Sanctum (Domain)", tech: "Pure C# (Zero External Taint)", role: "Сущности, Value Objects, инварианты рецептурных правил, доменные события без внешних зависимостей." },
        { id: "app", name: "02. Circle of Invocation (Application)", tech: "CQRS / MediatR / UseCases", role: "Команды модификации (Commands), запросы выборки (Queries), пайплайн валидации FluentValidation." },
        { id: "infra", name: "03. Outer Conduit (Infrastructure)", tech: "EF Core / PostgreSQL / RPC", role: "Связующие каналы к PostgreSQL, адаптеры репозиториев, сетевой клиент к Python AI сервису." },
        { id: "vector", name: "04. The Astral Eye (Qdrant AI)", tech: "Qdrant Vector DB + Python", role: "Генерация векторных эмбеддингов и семантическое прорицание препаратов по смыслу симптомов." }
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
    title: "Tanks1984 Arcane Engine",
    shortTitle: "Tanks1984",
    subtitle: "Deterministic Retro Engine in Pure ANSI C",
    school: "Transmutation",
    category: ["c"],
    stars: 0,
    featured: true,
    accentColor: "emerald",
    metrics: [
      { label: "Язык рун", val: "Pure ANSI C" },
      { label: "Магия памяти", val: "Ручной malloc/free" },
      { label: "Временной тик", val: "Детерминированный FPS" }
    ],
    caseStudy: {
      problem: "Создание автономного ретро-игрового движка с минимальным потреблением ресурсов, стабильной физикой и отсутствием утечек памяти.",
      solution: "Написание чистого Си кода с ручным выделением памяти, детерминированным циклом обновления и прямым буферизированным рендерером.",
      impact: "Нулевой оверхед рантайма, размер бинарника в десятки килобайт, стабильный тик и плавный отклик управления."
    },
    description: "Низкоуровневая реализация аркадного игрового движка на чистом Си. Ручное управление памятью, кастомный рендерер сетки и детерминированная игровая физика.",
    tags: ["C", "Low-level", "Memory Management", "Game Loop", "Retro"],
    githubUrl: "https://github.com/Asm-o-Dan/Tanks1984",
    architecture: {
      pattern: "State Machine + Fixed-Timestep Game Loop",
      diagram: [
        { id: "loop", name: "01. Fixed Time Loop", tech: "Tick & Delta Manager", role: "Детерминированный цикл обновления игрового состояния с фиксированным тиком времени." },
        { id: "entity", name: "02. Entity Memory", tech: "Pure C Structs", role: "Структуры для танков, снарядов, карты препятствий и AABB-коллизий." },
        { id: "ai", name: "03. Demon Tank AI", tech: "Grid State Search", role: "Автономное поведение вражеских танков и расчет баллистики снарядов." },
        { id: "render", name: "04. Direct Buffer", tech: "Double-Buffer Frame", role: "Прямой буферизированный вывод игрового поля без тяжелых внешних библиотек." }
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
    title: "Telegram Bot Suite & Optical Sight",
    shortTitle: "Telegram OCR",
    subtitle: "Context-Aware Automation & Tesseract OCR Pipeline",
    school: "Conjuration & Sight",
    category: ["c#", "python", "bot"],
    stars: 0,
    featured: true,
    accentColor: "amber",
    metrics: [
      { label: "Око зрения", val: "Tesseract OCR" },
      { label: "Призыв", val: "Event-Driven Worker" },
      { label: "Стойкость", val: "Auto-Reconnect Loop" }
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
        { id: "ingest", name: "01. Ingestion Conduit", tech: "Telegram API / Webhooks", role: "Прием сообщений, троттлинг запросов, буферизация очереди." },
        { id: "ocr", name: "02. Optical Sight Filter", tech: "Tesseract OCR / SkiaSharp", role: "Контрастирование, очистка шумов, извлечение текста из изображений." },
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
    school: "Abjuration & Order",
    category: ["c#", "architecture"],
    stars: 0,
    featured: false,
    accentColor: "cyan",
    metrics: [
      { label: "Стек", val: "ASP.NET Core / EF / Dapper" },
      { label: "Хранилище", val: "PostgreSQL" },
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
    title: "Automation & Data Sync Swarm",
    shortTitle: "Automation",
    subtitle: "Python Automation Scripts & Scrapers",
    school: "Evocation",
    category: ["python"],
    stars: 0,
    featured: false,
    accentColor: "emerald",
    metrics: [
      { label: "Стек", val: "Python AsyncIO" },
      { label: "Рой", val: "Worker Pool" },
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
        { id: "driver", name: "01. Async Conduit", tech: "Aiohttp / Requests", role: "Пул воркеров с ротацией User-Agent и авто-ретраями." },
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
    category: "Архитектура & Паттерны",
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

// Virtual Filesystem & Grimoire Commands for AsmODan Altar CLI
const virtualFS = {
  "/": ["bio.md", "dnd_stats.json", "manifest.txt", "grimoire/", "contacts.txt"],
  "/grimoire": ["drugs-engine.arch", "tanks-1984.c", "telegram-ocr.bot", "first-api.cqrs"],
  files: {
    "bio.md": "Даниил Гандапас (AsmODan)\nClass: Level 20 Systems Archmage & Backend Sorcerer\nСпециализация: C# (.NET 8), Python, Clean Architecture, CQRS, Qdrant Vector DB, Pure C\nМировоззрение: Lawful Neutral\nОбразование: ТИФТ (Программная инженерия)\nЛокация: Тирасполь / Remote",
    "dnd_stats.json": JSON.stringify({
      name: "AsmODan (Даниил Гандапас)",
      class: "Systems Archmage",
      level: 20,
      stats: { STR: "18 (+4)", DEX: "18 (+4)", CON: "20 (+5)", INT: "20 (+5)", WIS: "19 (+4)", CHA: "17 (+3)" },
      spells: ["clean-arch", "vector-search", "malloc-free", "banish-bug", "async-pipeline"]
    }, null, 2),
    "contacts.txt": "Telegram: https://t.me/SomeSimpleTag (@SomeSimpleTag)\nGitHub: https://github.com/Asm-o-Dan\nEmail: dgandapas1@gmail.com",
    "manifest.txt": "“Structure is freedom. Architecture is intention. I don’t just write code — I structure possibility.”",
    "grimoire/drugs-engine.arch": "Artifact: DrugsEngine & Python Vector Service\nSchool: Abjuration & Divination\nPattern: Clean Architecture + CQRS + Qdrant Vector DB\nRepo: https://github.com/Asm-o-Dan/DrugsEngine",
    "grimoire/tanks-1984.c": "Artifact: Tanks1984\nSchool: Transmutation (Pure ANSI C)\nPattern: Fixed-Timestep Loop & Zero Memory Leaks\nRepo: https://github.com/Asm-o-Dan/Tanks1984",
    "grimoire/telegram-ocr.bot": "Artifact: Telegram Bot Suite & Optical Sight\nSchool: Conjuration & Sight\nPattern: Event-Driven Worker Pool + Tesseract OCR\nRepo: https://github.com/Asm-o-Dan/TelegramBot",
    "grimoire/first-api.cqrs": "Artifact: Layered REST API & CQRS Core\nSchool: Abjuration & Order\nPattern: CQRS Read/Write Separation\nRepo: https://github.com/Asm-o-Dan/FirstApi"
  }
};

if (typeof window !== 'undefined') {
  window.ASM_PORTFOLIO = { characterSheet, hrQuickFacts, timelineData, teamValues, projectsData, skillsData, virtualFS };
}
if (typeof exports !== 'undefined') {
  exports.characterSheet = characterSheet;
  exports.hrQuickFacts = hrQuickFacts;
  exports.timelineData = timelineData;
  exports.teamValues = teamValues;
  exports.projectsData = projectsData;
  exports.skillsData = skillsData;
  exports.virtualFS = virtualFS;
}
