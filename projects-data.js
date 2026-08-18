/**
 * AsmODan — The Radial Ritual Circle & 3 Concentric Arcane Seals
 * Data Model for Core, Ring 1 (Chronicle), Ring 2 (Skills), and Ring 3 (Projects)
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

// =========================================================================
// RING 1: Внутренняя Печать (Образование и Опыт работы — Chronicle)
// =========================================================================
const ring1Chronicle = [
  {
    id: "exp-drugs",
    title: "DrugsEngine & Qdrant Scrying",
    period: "2024 — Наст. время",
    role: "Lead Systems Architect & Backend Engineer",
    icon: "sparkles",
    badge: "Abjuration & Divination",
    summary: "Разработка enterprise бэкенда на C# с Clean Architecture, CQRS и микросервисной интеграцией Qdrant Vector DB.",
    highlights: [
      "100% изоляция доменной модели от БД и сторонних библиотек",
      "Субсекундный семантический поиск по 1536-мерным эмбеддингам",
      "Полное покрытие критических бизнес-правил юнит-тестами"
    ],
    tech: ["C# .NET 8", "Clean Architecture", "CQRS", "Qdrant", "Python RPC"]
  },
  {
    id: "exp-bots",
    title: "Telegram Bot Suite & OCR Sight",
    period: "2023 — 2024",
    role: "Automation & Integration Engineer",
    icon: "eye",
    badge: "Conjuration & Sight",
    summary: "Создание отказоустойчивых Telegram-ботов с конвейером предобработки изображений и Tesseract OCR.",
    highlights: [
      "Неблокирующий асинхронный воркер-пул",
      "Оптическое распознавание документов с фильтрацией шумов",
      "Автоматическое переподключение с экспоненциальной задержкой"
    ],
    tech: ["C#", "Telegram.Bot API", "Tesseract OCR", "Async Pipeline"]
  },
  {
    id: "exp-tanks",
    title: "Tanks1984 Arcane Engine",
    period: "2022 — 2023",
    role: "Low-Level Systems Developer",
    icon: "shield",
    badge: "Transmutation & Pure C",
    summary: "Разработка детерминированного игрового движка на чистом Си с ручным управлением памятью.",
    highlights: [
      "Нулевой рантайм-оверхед и отсутствие утечек памяти (zero leaks)",
      "Детерминированный цикл обновления игрового состояния",
      "Прямой буферизированный рендерер сетки"
    ],
    tech: ["Pure ANSI C", "Pointers & Memory", "Fixed-Timestep Loop"]
  },
  {
    id: "exp-tift",
    title: "Тираспольский институт физики и техники (ТИФТ)",
    period: "Академия Магии",
    role: "Студент — Программная инженерия",
    icon: "graduation-cap",
    badge: "Arcane Foundations",
    summary: "Физико-технический факультет. Фундаментальная подготовка по computer science и инженерии ПО.",
    highlights: [
      "Алгоритмы и структуры данных, теория вычислимости",
      "Высшая математика, линейная алгебра и теория вероятностей",
      "Реляционные базы данных, реляционная алгебра и оптимизация SQL",
      "Системное программирование, архитектура ОС и сетей"
    ],
    tech: ["Software Engineering", "Algorithms", "Math", "RDBMS Theory"]
  }
];

// =========================================================================
// RING 2: Средняя Печать (Навыки & Матрица технологий — Spellbook)
// =========================================================================
const ring2Skills = [
  {
    id: "skill-csharp",
    name: "C# / .NET 8 & 9",
    category: "Languages & Frameworks",
    icon: "code-2",
    level: 95,
    school: "Abjuration Core",
    summary: "Глубокое владение современным C#: async/await, LINQ, Generic Host, Memory<T>, Span<T>, Reflection, DI.",
    points: ["ASP.NET Core Minimal APIs & Controllers", "Entity Framework Core & Dapper", "xUnit & Moq testing"]
  },
  {
    id: "skill-clean-arch",
    name: "Clean Arch & CQRS",
    category: "Architecture & Systems",
    icon: "layers",
    level: 95,
    school: "Ritual Geometry",
    summary: "Проектирование строго изолированных слоев: Domain, Application, Infrastructure. Паттерн CQRS с MediatR.",
    points: ["Domain Invariants & Value Objects", "Command/Query Segregation", "Event-Driven & Domain Events"]
  },
  {
    id: "skill-python-ai",
    name: "Python & Vector AI",
    category: "AI & Automation",
    icon: "sparkles",
    level: 90,
    school: "Divination Arts",
    summary: "FastAPI, AsyncIO, PyTorch NLP пайплайны, генерация векторных эмбеддингов, автоматизация и скрейпинг.",
    points: ["Microservice RPC Clients", "AsyncIO Task Queues", "Text Vectorization & Embeddings"]
  },
  {
    id: "skill-qdrant",
    name: "Qdrant Vector DB",
    category: "Databases & Search",
    icon: "database",
    level: 90,
    school: "Astral Scrying",
    summary: "1536-мерный семантический поиск по косинусному расстоянию, фильтрация по полезной нагрузке (payload).",
    points: ["HNSW Graph Indexing", "Payload Filtering & Scoring", "Vector Collections Optimization"]
  },
  {
    id: "skill-postgres",
    name: "PostgreSQL & Databases",
    category: "Databases",
    icon: "hard-drive",
    level: 90,
    school: "Persistence Runes",
    summary: "Проектирование реляционных схем, сложные SQL-запросы, индексы, транзакции, Dual-ORM (EF + Dapper).",
    points: ["Relational Schema Design", "B-Tree & GIN Indexes", "Dapper High-Perf Queries"]
  },
  {
    id: "skill-pure-c",
    name: "Pure ANSI C & Memory",
    category: "Low-Level",
    icon: "cpu",
    level: 80,
    school: "Transmutation",
    summary: "Прямое управление памятью (malloc/free), структуры данных, указатели, детерминированные циклы без GC.",
    points: ["Manual Memory Management", "Zero Memory Leaks", "Hardware & OS Kernels Understanding"]
  }
];

// =========================================================================
// RING 3: Внешняя Печать (Проекты-Реликвии — Artifacts)
// =========================================================================
const ring3Projects = [
  {
    id: "drugs-engine",
    title: "DrugsEngine & Qdrant Astral Search",
    shortTitle: "DrugsEngine",
    subtitle: "Enterprise Clean Architecture & Semantic Vector Scrying",
    school: "Abjuration & Divination",
    icon: "sword",
    stars: 1,
    metrics: [
      { label: "Архитектура", val: "Clean Arch + CQRS" },
      { label: "Векторный поиск", val: "Qdrant Vector DB" },
      { label: "Изоляция", val: "100% Domain Sanctum" }
    ],
    caseStudy: {
      problem: "Необходимость в отказоустойчивом бэкенде со сложными медицинскими инвариантами и быстрым семантическим поиском по неструктурированным симптомам.",
      solution: "Разделение на изолированные слои Domain, Application и Infrastructure с CQRS, вынос эмбеддингов в Python микросервис и векторную БД Qdrant.",
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
      ]
    }
  },
  {
    id: "tanks-1984",
    title: "Tanks1984 Arcane Engine",
    shortTitle: "Tanks1984",
    subtitle: "Deterministic Retro Engine in Pure ANSI C",
    school: "Transmutation",
    icon: "shield",
    stars: 0,
    metrics: [
      { label: "Стек рун", val: "Pure ANSI C" },
      { label: "Управление памятью", val: "Ручной malloc/free" },
      { label: "Рендерер", val: "Direct Buffer Loop" }
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
      ]
    }
  },
  {
    id: "telegram-ocr-bots",
    title: "Telegram Bot Suite & Optical Sight",
    shortTitle: "Telegram OCR",
    subtitle: "Context-Aware Automation & Tesseract OCR Pipeline",
    school: "Conjuration & Sight",
    icon: "eye",
    stars: 0,
    metrics: [
      { label: "Око зрения", val: "Tesseract OCR" },
      { label: "Воркеры", val: "Async Event Pipeline" },
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
      ]
    }
  },
  {
    id: "first-api-cqrs",
    title: "Layered REST API & CQRS Core",
    shortTitle: "FirstApi CQRS",
    subtitle: "Clean ASP.NET Core REST API & Database Access",
    school: "Abjuration & Order",
    icon: "book-open",
    stars: 0,
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
      ]
    }
  },
  {
    id: "automation-scrapers",
    title: "Automation & Data Sync Swarm",
    shortTitle: "Automation",
    subtitle: "Python Automation Scripts & Scrapers",
    school: "Evocation",
    icon: "bot",
    stars: 0,
    metrics: [
      { label: "Стек", val: "Python AsyncIO" },
      { label: "Рой", val: "Worker Pool" },
      { label: "Хранилище", val: "SQLite / JSON" }
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
      ]
    }
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
      stats: { STR: "18 (+4)", DEX: "18 (+4)", CON: "20 (+5)", INT: "20 (+5)", WIS: "19 (+4)", CHA: "17 (+3)" }
    }, null, 2),
    "contacts.txt": "Telegram: https://t.me/SomeSimpleTag (@SomeSimpleTag)\nGitHub: https://github.com/Asm-o-Dan\nEmail: dgandapas1@gmail.com",
    "manifest.txt": "“Structure is freedom. Architecture is intention. I don’t just write code — I structure possibility.”"
  }
};

if (typeof window !== 'undefined') {
  window.ASM_PORTFOLIO = {
    characterSheet,
    hrQuickFacts,
    ring1Chronicle,
    ring2Skills,
    ring3Projects,
    virtualFS
  };
}
if (typeof exports !== 'undefined') {
  exports.characterSheet = characterSheet;
  exports.hrQuickFacts = hrQuickFacts;
  exports.ring1Chronicle = ring1Chronicle;
  exports.ring2Skills = ring2Skills;
  exports.ring3Projects = ring3Projects;
  exports.virtualFS = virtualFS;
}
