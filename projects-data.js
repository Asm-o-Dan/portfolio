/**
 * Daniil Gandapas (Asm-o-Dan) — Portfolio Data
 * Grounded in real experience: .NET 8, ASP.NET Core, EF Core, PostgreSQL, Docker, Vue.js.
 */

const engineerProfile = {
  name: "Даниил Гандапас",
  handle: "Asm-o-Dan",
  role: "C# / .NET Backend Developer",
  status: "Открыт к предложениям (Junior / Intern, Удалённо)",
  location: "Тирасполь (UTC+2) / Удалённая работа",
  citizenship: "Гражданин РФ (готов к оформлению по ТК РФ, ГПХ, Самозанятости)",
  telegram: "@Asm_o_Dan",
  telegramUrl: "https://t.me/Asm_o_Dan",
  email: "dgandapas1@gmail.com",
  githubUrl: "https://github.com/Asm-o-Dan",
  resumePdf: "resume.pdf",
  bio: "Разрабатываю серверные приложения на C# (.NET 8/9, ASP.NET Core, Entity Framework Core) и PostgreSQL. Проектирую REST API, настраиваю фоновые задачи на Quartz.NET и асинхронные очереди сообщений. Опыт командной работы по методологии Agile/Scrum в DEX Technology (GitLab, GitFlow, Code Review, unit-тесты) и преподавания программирования в ITSkills Academy.",
  education: {
    institution: "ГОУ «Приднестровский государственный университет им. Т.Г. Шевченко»",
    faculty: "Физико-математический факультет / ИТИ (аккредитован в РФ)",
    degree: "Программная инженерия (Бакалавриат)",
    period: "2023 — 2027 (3 курс)"
  },
  keyMetrics: [
    { label: "Платформа", value: ".NET 8 / 9", detail: "C#, ASP.NET Core Web API, EF Core" },
    { label: "Базы данных", value: "PostgreSQL", detail: "Миграции, индексы, Dapper, SQLite" },
    { label: "Фоновые задачи", value: "Quartz.NET", detail: "BackgroundService, RabbitMQ" },
    { label: "Командный опыт", value: "GitFlow & CI", detail: "GitLab, xUnit, прохождение Code Review" }
  ]
};

// =========================================================================
// INTERACTIVE ARCHITECTURE BLUEPRINTS (DrugsEngine Clean Architecture & CQRS)
// =========================================================================
const architectureTopologies = {
  "drugs-engine": {
    id: "drugs-engine",
    title: "DrugsEngine: Clean Architecture & CQRS Pipeline",
    subtitle: "Модульная архитектура серверной платформы мониторинга и агрегации",
    pattern: "Clean Architecture + CQRS + EF Core / Dapper",
    metrics: [
      { key: "Изоляция ядра", val: "Чистый C# без внешних ORM в Domain" },
      { key: "Разделение потоков", val: "CQRS: EF Core на запись, Dapper на чтение" },
      { key: "Фоновый сбор", val: "Quartz.NET планировщик с повторными попытками" }
    ],
    layers: [
      {
        id: "domain",
        name: "01. Domain Layer (Ядро сущностей)",
        rule: "Зависимости: 0 внешних пакетов, 0 ORM, 0 UI",
        desc: "Сущности, агрегаты, Value Objects и доменные исключения. Проверка бизнес-правил и инвариантов выполняется внутри конструкторов и методов сущностей. Логика не зависит от базы данных и сторонних библиотек.",
        codeSnippet: `public sealed class PharmacyProduct : AggregateRoot<ProductId>
{
    public string Name { get; private set; }
    public decimal Price { get; private set; }
    public int StockQuantity { get; private set; }

    public void UpdatePrice(decimal newPrice)
    {
        if (newPrice <= 0)
            throw new InvalidPriceException("Цена должна быть строго положительной.");

        Price = newPrice;
        RaiseDomainEvent(new ProductPriceChangedEvent(Id, newPrice));
    }
}`
      },
      {
        id: "application",
        name: "02. Application Layer (CQRS & Сценарии)",
        rule: "Зависимости: только Domain Layer",
        desc: "Use Cases, команды мутации данных (Commands), запросы на выборку (Queries) и DTO. Обработка транзакций, валидация входных параметров и оркестрация репозиториев.",
        codeSnippet: `public record UpdatePriceCommand(Guid ProductId, decimal NewPrice) : IRequest<Result>;

public class UpdatePriceCommandHandler : IRequestHandler<UpdatePriceCommand, Result>
{
    private readonly IProductRepository _repository;
    private readonly IUnitOfWork _unitOfWork;

    public async Task<Result> Handle(UpdatePriceCommand request, CancellationToken ct)
    {
        var product = await _repository.GetByIdAsync(request.ProductId, ct);
        if (product is null) return Result.NotFound();

        product.UpdatePrice(request.NewPrice);
        await _unitOfWork.SaveChangesAsync(ct);
        return Result.Success();
    }
}`
      },
      {
        id: "infrastructure",
        name: "03. Infrastructure Layer (EF Core, Dapper, Quartz)",
        rule: "Зависимости: Domain, Application, БД и брокеры",
        desc: "Реализация интерфейсов хранения данных. EF Core применяется для сложных транзакционных записей в PostgreSQL, легковесный Dapper — для высокоскоростных Read-запросов без накладных расходов отслеживания состояний.",
        codeSnippet: `// Dapper Fast Read Query
public async Task<IReadOnlyList<ProductDto>> GetActiveProductsAsync(string query, CancellationToken ct)
{
    const string sql = """
        SELECT id, name, price, stock_quantity 
        FROM products 
        WHERE name ILIKE @query AND is_active = true 
        ORDER BY price ASC 
        LIMIT 50;
        """;

    return (await _db.QueryAsync<ProductDto>(sql, new { query = $"%{query}%" })).AsList();
}`
      }
    ]
  },
  "vector-pipeline": {
    id: "vector-pipeline",
    title: "DrugsEngine: Qdrant Vector & Semantic Search",
    subtitle: "Семантический поиск аналогов лекарственных препаратов по векторным эмбеддингам",
    pattern: "Async Ingestion -> Vector Embeddings -> Cosine Payload Index",
    metrics: [
      { key: "Размерность векторов", val: "1536-dim Dense Embeddings" },
      { key: "Метрика сходства", val: "Косинусное расстояние (Cosine)" },
      { key: "Фильтрация", val: "Гибридный поиск с фильтром по метаданным" }
    ],
    layers: [
      {
        id: "vec-ingest",
        name: "01. Подготовка и нормализация данных",
        rule: "Очистка текстов, токенизация, удаление шума",
        desc: "Конвейер очищает описания действующих веществ, нормализует медицинские наименования и формирует текстовые чанки для последующей векторизации.",
        codeSnippet: `def clean_substance_text(raw_text: str) -> str:
    cleaned = re.sub(r'\\s+', ' ', raw_text).strip().lower()
    return normalize_medical_terms(cleaned)`
      },
      {
        id: "vec-embed",
        name: "02. Микросервис векторизации",
        rule: "Генерация числовых векторных представлений",
        desc: "Асинхронный сервис на FastAPI преобразует текстовое описание действующего вещества в плотный числовой вектор фиксированной размерности.",
        codeSnippet: `vector = model.encode(chunk, normalize_embeddings=True)
return {"vector": vector.tolist(), "dim": len(vector)}`
      },
      {
        id: "vec-qdrant",
        name: "03. Поиск по коллекции в Qdrant",
        rule: "Поиск ближайших соседей (HNSW) с фильтрацией",
        desc: "Выполнение векторного поиска аналогов с наложением фильтров по форме выпуска, дозировке и наличию в аптечных сетях.",
        codeSnippet: `results = qdrant_client.search(
    collection_name="medications",
    query_vector=query_vector,
    query_filter=models.Filter(
        must=[models.FieldCondition(key="in_stock", match=models.MatchValue(value=True))]
    ),
    limit=10
)`
      }
    ]
  }
};

// =========================================================================
// REAL PROJECTS SHOWCASE
// =========================================================================
const projectsData = [
  {
    id: "drugs-engine",
    title: "DrugsEngine",
    subtitle: "Backend-платформа мониторинга и агрегации медицинских данных",
    category: ["dotnet", "backend", "database"],
    featured: true,
    topologyId: "drugs-engine",
    description: "Серверное приложение для сбора, агрегации и семантического анализа фармацевтических данных и прайс-листов.",
    highlights: [
      "REST API на ASP.NET Core с чистой слоистой архитектурой (Clean Architecture) и CQRS.",
      "Планировщик фоновых задач на Quartz.NET и BackgroundService для периодического сбора данных.",
      "Реляционная модель в PostgreSQL через EF Core, оптимизация частых выборок через индексы и Dapper.",
      "Асинхронная передача сообщений через RabbitMQ и контейнеризация стека через Docker Compose."
    ],
    stack: ["C#", ".NET 8", "ASP.NET Core", "PostgreSQL", "EF Core", "Dapper", "Quartz.NET", "Docker"],
    githubUrl: "https://github.com/Asm-o-Dan/DrugsEngine",
    extraRepoUrl: "https://github.com/Asm-o-Dan/DrugsEnginePythonService"
  },
  {
    id: "asia-capitals-quiz",
    title: "Asia Capitals Quiz & Explorer",
    subtitle: "Интерактивная викторина и справочник 47 государств Азии (SPA)",
    category: ["frontend", "spa"],
    featured: true,
    topologyId: null,
    description: "Одностраничное веб-приложение на Vue.js 2 с живой фильтрацией каталога стран и динамической викториной на знание столиц.",
    highlights: [
      "Каталог 47 стран Азии с флагами и мгновенным поиском через вычисляемые свойства (computed properties).",
      "Игровой режим: случайная генерация вопросов, валидация ответов без учета регистра, подсчет очков за серию.",
      "Сохранение лучшего рекорда в localStorage и экран детального результата.",
      "Адаптивный интерфейс со стилизацией на SCSS и клиентской маршрутизацией через Vue Router."
    ],
    stack: ["Vue.js 2", "Vue Router", "JavaScript", "SCSS", "LocalStorage API"],
    githubUrl: "https://github.com/Asm-o-Dan/Final_Work"
  },
  {
    id: "charity-fund-is",
    title: "Charity Fund IS",
    subtitle: "Информационная система учёта благотворительного фонда",
    category: ["dotnet", "database"],
    featured: true,
    topologyId: null,
    description: "Настольная информационная система для автоматизации учета поступлений, распределения благотворительной помощи и формирования отчетности.",
    highlights: [
      "Реализация прямого доступа к данным через ADO.NET без оверхеда тяжелых ORM.",
      "Разграничение ролей доступа (администратор, оператор), транзакционные операции пожертвований.",
      "Поддержка реляционных баз данных MS SQL Server и SQLite."
    ],
    stack: ["C#", ".NET 8", "ADO.NET", "MS SQL Server", "SQLite", "Windows Forms"],
    githubUrl: "https://github.com/Asm-o-Dan/charity-fund-is"
  },
  {
    id: "itskills-english-hub",
    title: "ITSkills English Hub",
    subtitle: "Интерактивный учебный сервис для студентов академии ITSkills",
    category: ["frontend", "education"],
    featured: false,
    topologyId: null,
    description: "Веб-инструмент с интерактивными карточками и озвучкой терминов для студентов курса мобильной разработки MIT App Inventor.",
    highlights: [
      "Интерактивные 3D-карточки терминов с двусторонним переворотом.",
      "Синтез речи через Web Speech API для тренировки правильного произношения IT-лексики.",
      "Успешно внедрен в учебный процесс для более чем 50 учеников академии."
    ],
    stack: ["JavaScript", "HTML5", "CSS3", "Web Speech API", "GitHub Pages"],
    githubUrl: "https://github.com/Asm-o-Dan/itskills-english-hub"
  },
  {
    id: "lirix",
    title: "Lirix Android Companion",
    subtitle: "Сервис синхронизации текста и аккордов для медиаплееров",
    category: ["android", "mobile"],
    featured: false,
    topologyId: null,
    description: "Android-приложение, работающее поверх музыкальных плееров и автоматически подтягивающее тексты песен и аккорды.",
    highlights: [
      "Асинхронный перехват медиа-событий Android Notification Listener Service.",
      "Кэширование данных в локальной БД и плавный оверлей поверх других окон."
    ],
    stack: ["Kotlin", "Android SDK", "NotificationListenerService", "Coroutines"],
    githubUrl: "https://github.com/Asm-o-Dan/lirix"
  }
];

// =========================================================================
// TECHNICAL SKILLS & TOOLS
// =========================================================================
const skillsData = [
  {
    category: "Языки и платформа",
    icon: "code-2",
    items: [
      "C#",
      ".NET 8 / 9",
      "ASP.NET Core Web API",
      "Entity Framework Core",
      "LINQ & Generics",
      "Async / Await (Task-based)",
      "xUnit & Moq"
    ]
  },
  {
    category: "Базы данных и ORM",
    icon: "database",
    items: [
      "PostgreSQL",
      "Dapper (Micro-ORM)",
      "EF Core (Code-First & Migrations)",
      "Индексы и транзакции",
      "MS SQL Server",
      "SQLite",
      "Redis"
    ]
  },
  {
    category: "Архитектура и сервисы",
    icon: "layers",
    items: [
      "Clean Architecture",
      "CQRS (MediatR pattern)",
      "RESTful API design",
      "Quartz.NET планировщик",
      "BackgroundService",
      "RabbitMQ (базовые очереди)",
      "Qdrant Vector DB"
    ]
  },
  {
    category: "Инфраструктура и Frontend",
    icon: "cpu",
    items: [
      "Docker & Docker Compose",
      "Git & GitFlow",
      "GitLab CI & GitHub Actions",
      "Vue.js 2 (SPA, Vue Router)",
      "JavaScript & SCSS",
      "Swagger / OpenAPI"
    ]
  }
];

// =========================================================================
// EXPERIENCE & EDUCATION TIMELINE
// =========================================================================
const timelineData = [
  {
    period: "2023 — настоящее время",
    role: "Преподаватель программирования и робототехники",
    company: "ITSkills Academy",
    type: "Работа",
    highlights: [
      "Обучение школьников и студентов основам алгоритмизации, ООП и разработке логики приложений.",
      "Структурирование учебных планов и адаптация сложных инженерных тем под разный уровень восприятия.",
      "Разработка веб-сервиса itskills-english-hub для интерактивного изучения технической лексики."
    ]
  },
  {
    period: "2024",
    role: "Стажёр C# .NET Backend Developer",
    company: "DEX Technology",
    type: "Практика",
    highlights: [
      "Участие в командной разработке серверных модулей на C# по методологии Agile/Scrum.",
      "Работа в корпоративном GitLab: ветвление по GitFlow, написание модульных тестов и прохождение регулярного Code Review."
    ]
  },
  {
    period: "2023 — 2027 (3 курс)",
    role: "Студент направления «Программная инженерия» (Бакалавриат)",
    company: "ГОУ «ПГУ им. Т.Г. Шевченко»",
    type: "Образование",
    highlights: [
      "Профильный факультет информационных технологий / физико-математический (аккредитация в РФ).",
      "Изучение структур данных, алгоритмов, архитектуры вычислительных систем, баз данных и системного анализа."
    ]
  }
];

if (typeof window !== 'undefined') {
  window.ASM_PORTFOLIO = {
    engineerProfile,
    architectureTopologies,
    projectsData,
    skillsData,
    timelineData
  };
}

if (typeof exports !== 'undefined') {
  exports.engineerProfile = engineerProfile;
  exports.architectureTopologies = architectureTopologies;
  exports.projectsData = projectsData;
  exports.skillsData = skillsData;
  exports.timelineData = timelineData;
}
