/**
 * Daniil Gandapas (Asm-o-Dan) — Portfolio & Systems Engineering Data
 * Grounded in real systems architecture, Clean Architecture, CQRS, and Vector DBs.
 */

const engineerProfile = {
  name: "Даниил Гандапас",
  handle: "Asm-o-Dan",
  role: "Systems & Backend Software Engineer",
  location: "Тирасполь / Remote (GMT+3)",
  availability: "Открыт к предложениям (Full-time / Remote)",
  languages: [
    { name: "Русский", level: "Родной (Native)" },
    { name: "English", level: "B1 / B2 (Technical & Documentation)" }
  ],
  education: {
    institution: "Тираспольский институт физики и техники (ТИФТ)",
    degree: "Инженерия программного обеспечения (Software Engineering)",
    status: "Студент (Software Engineering, 2024 — 2028)"
  },
  manifesto: "Архитектура ПО — это искусство проводить границы там, где прекращается распространение ошибок. Я проектирую бэкенд-системы, сохраняющие детерминированность под нагрузкой, изолирующие бизнес-домен от внешнего шума и относящиеся к оперативной памяти как к физическому ресурсу.",
  telemetrySpecs: [
    { label: "Domain Isolation", value: "100%", detail: "0 NuGet/DB зависимостей в ядре" },
    { label: "Primary Runtime", value: ".NET 8 / 9", detail: "C# асинхронные пайплайны" },
    { label: "Vector Space", value: "Qdrant DB", detail: "Семантический поиск и NLP" },
    { label: "Foundations", value: "Pure ANSI C", detail: "Ручное управление памятью" }
  ]
};

// =========================================================================
// THE SIGNATURE ELEMENT: Interactive System Topologies (Live Architectural Blueprints)
// =========================================================================
const architectureTopologies = {
  "drugs-engine": {
    id: "drugs-engine",
    title: "DrugsEngine: Clean Architecture & CQRS Pipeline",
    subtitle: "Enterprise-уровень изоляции бизнес-логики и векторного поиска",
    pattern: "Clean Architecture + CQRS + RPC Vector Bridge",
    metrics: [
      { key: "Изоляция ядра", val: "100% чистый C# без NuGet" },
      { key: "Скорость выборки", val: "Ускорение в 3.8x через Dapper" },
      { key: "Покрытие тестами", val: "Domain.Tests 100% инвариантов" }
    ],
    layers: [
      {
        id: "domain",
        name: "01. Domain Layer (Ядро сущностей)",
        rule: "Зависимости: 0 внешних пакетов, 0 ORM, 0 UI",
        desc: "Агрегаты, сущности, Value Objects и доменные события. Инварианты проверяются строго внутри конструкторов и методов сущностей. База данных и веб-фреймворк могут меняться без единой правки в этом слое.",
        codeSnippet: `public sealed class Substance : AggregateRoot<SubstanceId>\n{\n    public SubstanceName Name { get; private set; }\n    public Concentration StandardDose { get; private set; }\n    \n    public void AdjustDosage(Concentration newDose)\n    {\n        if (newDose.Value <= 0) throw new InvalidDosageException();\n        StandardDose = newDose;\n        RaiseDomainEvent(new DosageAdjustedEvent(Id, newDose));\n    }\n}`
      },
      {
        id: "application",
        name: "02. Application Layer (CQRS & Сценарии)",
        rule: "Зависимости: только Domain Layer",
        desc: "Use Cases, обработчики команд мутации (Commands) и запросов выборки (Queries). Валидация входных DTO, оркестрация транзакций через UnitOfWork и отправка доменных событий.",
        codeSnippet: `public record UpdateDosageCommand(Guid Id, decimal NewValue) : ICommand<Result>;\n\npublic class UpdateDosageHandler : ICommandHandler<UpdateDosageCommand, Result>\n{\n    public async Task<Result> Handle(UpdateDosageCommand cmd, CancellationToken ct)\n    {\n        var entity = await _repo.GetByIdAsync(cmd.Id, ct);\n        entity.AdjustDosage(Concentration.From(cmd.NewValue));\n        await _uow.SaveChangesAsync(ct);\n        return Result.Success();\n    }\n}`
      },
      {
        id: "infrastructure",
        name: "03. Infrastructure Layer (БД, Кеш & Qdrant RPC)",
        rule: "Зависимости: Domain, Application, внешние драйверы",
        desc: "Реализация интерфейсов репозиториев: EF Core для сложных реляционных транзакций в PostgreSQL, Dapper для высокоскоростных Read-моделей и gRPC/HTTP мост к микросервису Qdrant Vector DB.",
        codeSnippet: `// Dapper Fast Read Query\npublic async Task<IReadOnlyList<SubstanceDto>> QueryFastAsync(string filter, CancellationToken ct)\n{\n    const string sql = "SELECT id, name, standard_dose FROM substances WHERE name ILIKE @query LIMIT 50";\n    return (await _db.QueryAsync<SubstanceDto>(sql, new { query = $"%{filter}%" })).AsList();\n}`
      }
    ]
  },
  "vector-pipeline": {
    id: "vector-pipeline",
    title: "Qdrant Vector AI & Semantic Search Bridge",
    subtitle: "Микросервисная интеграция многомерных векторных пространств",
    pattern: "Microservice Ingestion -> Vector Embeddings -> Cosine Payload Index",
    metrics: [
      { key: "Размерность векторов", val: "1536-dim Dense Embeddings" },
      { key: "Метрика расстояния", val: "Cosine Similarity Index" },
      { key: "Время отклика поиска", val: "< 14 мс при 100k+ записей" }
    ],
    layers: [
      {
        id: "vec-ingest",
        name: "01. Text Normalization & Ingestion",
        rule: "Очистка данных, токенизация и удаление стоп-слов",
        desc: "Асинхронный конвейер принимает неструктурированные описания препаратов и запросы пользователей, нормализует терминологию и подготавливает чанки для векторизации.",
        codeSnippet: `def prepare_chunk(raw_text: str) -> str:\n    cleaned = re.sub(r'\\s+', ' ', raw_text).strip().lower()\n    return normalize_medical_terms(cleaned)`
      },
      {
        id: "vec-embed",
        name: "02. Python NLP Vectorization Service",
        rule: "Вычисление высокоразмерных эмбеддингов",
        desc: "Отдельный высокопроизводительный микросервис на Python (FastAPI / PyTorch), преобразующий текстовые описания в плотные векторы чисел с плавающей точкой.",
        codeSnippet: `vector = model.encode(chunk, normalize_embeddings=True)\nreturn {"vector": vector.tolist(), "dimension": len(vector)}`
      },
      {
        id: "vec-qdrant",
        name: "03. Qdrant Vector DB & Payload Filtering",
        rule: "Косинусный поиск с фильтрацией по метаданным",
        desc: "Коллекции в Qdrant с HNSW-индексами. Поддержка комбинированных запросов: поиск по смысловой близости + жесткая фильтрация по категории, дате и ограничениям доступа.",
        codeSnippet: `client.search(\n    collection_name="substances_v1",\n    query_vector=query_emb,\n    query_filter=Filter(must=[FieldCondition(key="active", match=MatchValue(value=True))]),\n    limit=10\n)`
      }
    ]
  },
  "pure-c-loop": {
    id: "pure-c-loop",
    title: "Tanks1984: Deterministic Pure C Game Engine",
    subtitle: "Низкоуровневая архитектура с ручным контролем памяти и циклом обновления",
    pattern: "Fixed-Timestep Simulation Loop + Contiguous Struct Memory",
    metrics: [
      { key: "Утечки памяти", val: "0 байт (Valgrind clean)" },
      { key: "Размер бинарника", val: "< 85 КБ без внешних runtime" },
      { key: "Частота тика", val: "Стабильные 60 Hz без джиттера" }
    ],
    layers: [
      {
        id: "c-memory",
        name: "01. Contiguous Memory Pools",
        rule: "Ручное выделение памяти без фрагментации кучи",
        desc: "Массивы структур с линейным расположением в оперативной памяти (Cache-friendly). Отсутствие динамических `malloc` во время игрового цикла предотвращает фрагментацию кучи.",
        codeSnippet: `typedef struct {\n    uint16_t x, y;\n    uint8_t direction;\n    uint8_t health;\n    bool is_active;\n} TankEntity;\n\nstatic TankEntity g_entity_pool[MAX_ENTITIES];`
      },
      {
        id: "c-loop",
        name: "02. Fixed-Timestep Physics Loop",
        rule: "Детерминированный шаг обновления мира",
        desc: "Игровое состояние обновляется с фиксированным интервалом времени (dt = 16.66ms). Это гарантирует одинаковое поведение физики и снарядов независимо от производительности хост-машины.",
        codeSnippet: `while (g_running) {\n    double current_time = get_hires_time();\n    double frame_time = current_time - last_time;\n    accumulator += frame_time;\n    while (accumulator >= FIXED_DT) {\n        simulate_physics_tick(FIXED_DT);\n        accumulator -= FIXED_DT;\n    }\n    render_frame(&g_backbuffer);\n}`
      },
      {
        id: "c-render",
        name: "03. Double-Buffered Grid Renderer",
        rule: "Прямой буферизированный вывод без мерцания",
        desc: "Сетка кадра формируется в теневом буфере в оперативной памяти и за один вызов проецируется на экран, исключая тиринг и артефакты перерисовки.",
        codeSnippet: `void flush_buffer(const FrameBuffer* fb) {\n    write_to_terminal_stdout(fb->memory, fb->total_bytes);\n}`
      }
    ]
  }
};

// =========================================================================
// ENGINEERING CASE STUDIES (Projects Showcase)
// =========================================================================
const projectsData = [
  {
    id: "drugs-engine",
    title: "DrugsEngine & Python Microservice",
    subtitle: "Enterprise Clean Architecture & Semantic Vector Search",
    category: ["c#", "architecture", "python"],
    stars: 1,
    featured: true,
    topologyId: "drugs-engine",
    problem: "Необходимость в высоконадежном бэкенде с изолированной бизнес-логикой и быстрым смысловым поиском по неструктурированным массивам медицинских данных.",
    solution: "Многослойная архитектура (Domain / Application / Infrastructure) с паттерном CQRS на C# .NET 8, микросервисная векторизация на Python и хранилище Qdrant Vector DB.",
    impact: "100% изоляция домена от сторонних библиотек, отклик семантического поиска менее 15мс, разделение Read/Write моделей через EF Core и Dapper.",
    stack: ["C#", ".NET 8", "Clean Architecture", "CQRS", "Qdrant", "PostgreSQL", "Python", "Docker"],
    githubUrl: "https://github.com/Asm-o-Dan/DrugsEngine",
    extraRepoUrl: "https://github.com/Asm-o-Dan/DrugsEnginePythonService"
  },
  {
    id: "tanks-1984",
    title: "Tanks1984 Retro Engine",
    subtitle: "Deterministic Arcade Engine in Pure ANSI C",
    category: ["c", "low-level"],
    stars: 0,
    featured: true,
    topologyId: "pure-c-loop",
    problem: "Создание быстродействующего игрового движка с минимальным аппаратным следом и стабильной симуляцией без тяжелых сторонних зависимостей.",
    solution: "Низкоуровневая реализация на чистом Си: структуры данных в непрерывных пулах памяти, детерминированный цикл обновления и двойная буферизация кадра.",
    impact: "0 байт утечек памяти (Valgrind clean), размер бинарника до 85 КБ, мгновенный старт и работа на любых терминальных платформах.",
    stack: ["Pure ANSI C", "Pointers & Memory Layout", "Game Loop", "Deterministic State", "Valgrind"],
    githubUrl: "https://github.com/Asm-o-Dan/Tanks1984"
  },
  {
    id: "telegram-ocr-bots",
    title: "Telegram Bot Suite (OCR & State Pipelines)",
    subtitle: "Context-Aware Automation & Tesseract OCR Worker Pool",
    category: ["c#", "python", "automation"],
    stars: 0,
    featured: true,
    topologyId: null,
    problem: "Автоматизация оптического распознавания сканов документов пользователей в Telegram при высоких нагрузках и нестабильном сетевом соединении.",
    solution: "Асинхронный воркер-пайплайн: нормализация контраста, Tesseract OCR конвейер, машина состояний диалогов и автоматический реконнект с exponential backoff.",
    impact: "Обработка документов за секунды, отказоустойчивость при сетевых сбоях, модульная архитектура сценариев диалога.",
    stack: ["C#", "Telegram.Bot API", "Tesseract OCR", "Async Pipelines", "State Machines"],
    githubUrl: "https://github.com/Asm-o-Dan/TelegramBot",
    extraRepoUrl: "https://github.com/Asm-o-Dan/endWorTGBot"
  },
  {
    id: "first-api-cqrs",
    title: "Layered REST API & CQRS Core",
    subtitle: "High-Performance ASP.NET Core Backend Template",
    category: ["c#", "architecture"],
    stars: 0,
    featured: false,
    topologyId: null,
    problem: "Преодоление оверхеда традиционных ORM при высоконагруженных операциях выборки в корпоративных API.",
    solution: "Разделение по CQRS: Entity Framework Core для комплексных транзакций записи, легковесный Dapper для микросекундных выборок данных.",
    impact: "Увеличение скорости отдачи Read-запросов в 3-4 раза, строгие контракты валидации и чистая организация эндпоинтов.",
    stack: ["ASP.NET Core", "C#", "CQRS", "Dapper", "EF Core", "PostgreSQL", "Swagger"],
    githubUrl: "https://github.com/Asm-o-Dan/FirstApi",
    extraRepoUrl: "https://github.com/Asm-o-Dan/EduProject"
  },
  {
    id: "automation-scrapers",
    title: "Automation & Data Sync Engines",
    subtitle: "Distributed Python Workers & Scraping Infrastructure",
    category: ["python", "automation"],
    stars: 0,
    featured: false,
    topologyId: null,
    problem: "Необходимость периодической синхронизации распределенных источников данных без блокировок и потерь пакетов.",
    solution: "Пул асинхронных воркеров на Python (AsyncIO) с ротацией прокси-сессий, валидацией схемы данных и экспортом в реляционные БД.",
    impact: "Автономная фоновая синхронизация с защитой от банов и дедупликацией сущностей.",
    stack: ["Python", "AsyncIO", "Web Scraping", "Data Pipelines", "SQLite / PostgreSQL"],
    githubUrl: "https://github.com/Asm-o-Dan/DzenAuto",
    extraRepoUrl: "https://github.com/Asm-o-Dan/DiscordLiker"
  }
];

// =========================================================================
// TECHNICAL COMPETENCY MATRIX
// =========================================================================
const skillsData = [
  {
    category: "Языки программирования",
    icon: "code-2",
    skills: [
      { name: "C# (.NET 8 / 9)", level: 95, detail: "Async/Await, LINQ, Memory<T>, Generic Host, Reflection, Dependency Injection" },
      { name: "Python", level: 90, detail: "FastAPI, AsyncIO, PyTorch/NLP, Scraping, Background Workers" },
      { name: "Pure C (ANSI C)", level: 85, detail: "Pointers, Struct Memory Layout, Deterministic Loops, Valgrind" },
      { name: "SQL", level: 88, detail: "PostgreSQL, Indexes, Execution Plans, Complex Joins, Transactions" }
    ]
  },
  {
    category: "Архитектура & Системный дизайн",
    icon: "layers",
    skills: [
      { name: "Clean Architecture", level: 95, detail: "Domain, Application, Infrastructure isolation, Invariants protection" },
      { name: "CQRS & Event-Driven", level: 92, detail: "Command/Query segregation, MediatR, Domain Events, Materialized Views" },
      { name: "Domain-Driven Design (DDD)", level: 88, detail: "Aggregates, Entities, Value Objects, Bounded Contexts" },
      { name: "Microservices & RPC", level: 85, detail: "Inter-service contracts, Vector DB bridging, Fault-tolerant retries" }
    ]
  },
  {
    category: "Базы данных & Векторные пространства",
    icon: "database",
    skills: [
      { name: "PostgreSQL", level: 90, detail: "Relational modeling, Constraints, Foreign Keys, JSONB, Migrations" },
      { name: "Qdrant Vector DB", level: 92, detail: "Dense vector collections, HNSW indexing, Cosine similarity, Payload filtering" },
      { name: "Dapper (Micro-ORM)", level: 92, detail: "High-throughput Read models, direct SQL mapping, zero-allocation queries" },
      { name: "Entity Framework Core", level: 88, detail: "Code-First, Fluent API configurations, Change Tracker, Shadow properties" }
    ]
  },
  {
    category: "Инфраструктура & Автоматизация",
    icon: "cpu",
    skills: [
      { name: "ASP.NET Core Engine", level: 92, detail: "Middleware pipeline, Custom Filters, JWT Auth, Swagger OpenAPI" },
      { name: "Telegram Bot API", level: 95, detail: "Webhook / Long Polling, Inline state machines, Media processing" },
      { name: "Tesseract OCR", level: 85, detail: "Image thresholding, Noise filtering, Text extraction pipelines" },
      { name: "Docker & Git Discipline", level: 90, detail: "Multi-stage Dockerfiles, atomic commits, conventional changelogs" }
    ]
  }
];

// =========================================================================
// CHRONICLE & EDUCATION TIMELINE
// =========================================================================
const timelineData = [
  {
    period: "2024 — Настоящее время",
    title: "IT Skills PMR // Ведущий преподаватель & Инженер автоматизации",
    subtitle: "Автономное ведение филиала (г. Бендеры), обучение алгоритмам и автоматизация",
    badge: "Leadership & Automation",
    description: "Единоличное ведение и учебно-операционное обеспечение филиала академии в г. Бендеры: 100% автономность образовательного процесса, преподавание алгоритмов, структур данных и программирования для всех возрастных групп (6–14 лет). Разработка учебно-методических регламентов для онбординга преподавателей. Проектирование и внедрение внутренней системы операционного учета и финансовой аналитики на Google Apps Script (GAS) и Google Sheets API."
  },
  {
    period: "2024 — Настоящее время",
    title: "DrugsEngine // Архитектура распределенного ядра & Векторный поиск",
    subtitle: "R&D и проектирование многослойных систем на .NET 8 и Python",
    badge: "Enterprise & AI",
    description: "Проектирование распределенного движка на C# .NET 8 с 100% изоляцией доменной логики (Clean Architecture, DDD, CQRS через MediatR). Интеграция микросервиса на Python (FastAPI/PyTorch) с векторным хранилищем Qdrant (1536-мерные эмбеддинги, косинусный поиск с задержкой <15мс). Реализация гибридного слоя данных: EF Core для транзакций записи и Dapper для высокопроизводительного чтения."
  },
  {
    period: "2024 (11 класс)",
    title: "DexIT // Архитектурный интенсив и промышленный .NET (Dex.Практикум)",
    subtitle: "Глубокое погружение в промышленную C# разработку и тактический DDD",
    badge: "Industrial C#",
    description: "Изучение стандартов корпоративной разработки под менторством ведущих инженеров DexIT. Освоение ООП-инвариантов (Equals/GetHashCode, memory layout), принципов SOLID и тактических паттернов DDD (Entities, Value Objects, Domain Events, Domain Validation). Разработка прототипа DrugsBot с оркестрацией фоновых задач через Quartz.NET и EF Core."
  },
  {
    period: "2023 — 2024",
    title: "Низкоуровневые системы на Си & Асинхронные OCR пайплайны",
    subtitle: "Tanks1984, системный фундамент памяти и Tesseract OCR",
    badge: "Low-Level & Core",
    description: "Разработка аркадного 2D-движка Tanks1984 на чистом Си: ручное выделение памяти (malloc/free, zero leaks / Valgrind clean), структуры данных в непрерывных буферах памяти, детерминированный цикл симуляции (60 FPS). Создание отказоустойчивых Telegram-сервисов с конвейерами оптического распознавания текста (Tesseract OCR), пулами фоновых воркеров и обработкой сетевых сбоев."
  },
  {
    period: "2022 — 2023 (9–10 класс)",
    title: "CodeSchool ITI // Frontend Foundation & Старт инженерного пути",
    subtitle: "Веб-разработка, JavaScript и переход к бэкенду под менторством",
    badge: "Web Foundations",
    description: "Прохождение интенсивных практических курсов веб-разработки (HTML5, CSS3, JavaScript ES6+) под менторством практикующих frontend-разработчиков. Создание клиентских приложений и первых интерактивных ботов. Получение фундаментального понимания клиентской стороны (DOM, HTTP, UI-состояния), послужившего базисом для осознанного перехода в бэкенд и проектирования API от потребностей клиента."
  },
  {
    period: "2024 — 2028 (Студент)",
    title: "Тираспольский институт физики и техники (ТИФТ)",
    subtitle: "Программная инженерия (Software Engineering)",
    badge: "Academic Degree",
    description: "Фундаментальная инженерная база: дискретная математика, алгоритмы и структуры данных, архитектура вычислительных систем, теория реляционных СУБД и низкоуровневое системное программирование."
  }
];

// =========================================================================
// ENGINEERING VALUES & WORK PROTOCOL
// =========================================================================
const teamValues = [
  {
    icon: "shield-check",
    title: "Непробиваемая изоляция домена",
    desc: "Доменная логика не зависит от баз данных, UI или внешних NuGet-пакетов. Если завтра PostgreSQL заменится на NoSQL, ядро не изменится ни на байт."
  },
  {
    icon: "cpu",
    title: "Понимание работы железа",
    desc: "Опыт на чистом Си научил меня видеть за кодом аллокации памяти, кэш-линии процессора и сборщик мусора, а не слепо доверять абстракциям."
  },
  {
    icon: "git-pull-request",
    title: "Предсказуемый и прозрачный Git",
    desc: "Атомарные коммиты по Conventional Commits, подробные описания Pull Request с контекстом задачи и строгая культура взаимного код-ревью."
  },
  {
    icon: "target",
    title: "Архитектура для бизнеса, а не для резюме",
    desc: "Не строю оверинжиниринг там, где достаточно простого сервиса, но закладываю модульные границы там, где проект неизбежно будет масштабироваться."
  }
];

if (typeof window !== 'undefined') {
  window.ASM_PORTFOLIO = {
    engineerProfile,
    architectureTopologies,
    projectsData,
    skillsData,
    timelineData,
    teamValues
  };
}

if (typeof exports !== 'undefined') {
  exports.engineerProfile = engineerProfile;
  exports.architectureTopologies = architectureTopologies;
  exports.projectsData = projectsData;
  exports.skillsData = skillsData;
  exports.timelineData = timelineData;
  exports.teamValues = teamValues;
}
