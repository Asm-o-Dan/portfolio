/**
 * Daniil Gandapas (Asm-o-Dan) — единый источник данных портфолио.
 * Из этих данных рендерятся все три вкладки (Обзор, Лаборатория, Досье) и CLI,
 * поэтому факт правится в одном месте.
 *
 * Правило: всё, что сказано про DrugsEngine, должно находиться в коде по ссылке рядом.
 */

const REPO = "https://github.com/Asm-o-Dan/DrugsEngine";
const REPO_BRANCH = "feature/junior-to-middle-refactoring";
const REPO_BLOB = `${REPO}/blob/${REPO_BRANCH}`;
const PY_REPO = "https://github.com/Asm-o-Dan/DrugsEnginePythonService";
const PY_BLOB = `${PY_REPO}/blob/main`;

const engineerProfile = {
  name: "Даниил Гандапас",
  handle: "Asm-o-Dan",
  role: "C# / .NET Backend Developer",
  level: "Junior",
  summary:
    "Пишу серверные приложения на C# и .NET 8: ASP.NET Core, EF Core, PostgreSQL, MediatR. " +
    "Слоистая архитектура с изолированным доменом, обмен между сервисами через Kafka и RabbitMQ, " +
    "запуск всего стека в Docker Compose, логи и трассировка через Serilog и OpenTelemetry.",
  status: "Ищу работу: Junior .NET Backend, удалённо",
  avatar: "https://github.com/Asm-o-Dan.png?size=320",
  telegram: "@Asm_o_Dan",
  telegramUrl: "https://t.me/Asm_o_Dan",
  email: "dgandapas1@gmail.com",
  githubUrl: "https://github.com/Asm-o-Dan",
  githubLabel: "github.com/Asm-o-Dan",
  resumePdf: "resume.pdf",
  facts: [
    { label: "Позиция", value: "Junior .NET Backend Developer / стажёр" },
    { label: "Формат", value: "Удалённо, полная занятость" },
    { label: "Оформление", value: "ТК РФ (дистанционно), ГПХ, НПД" },
    { label: "Гражданство", value: "Российская Федерация" },
    { label: "Часовой пояс", value: "Тирасполь, UTC+2 (МСК −1)" },
    { label: "Образование", value: "ПГУ им. Т.Г. Шевченко, «Программная инженерия», 3 курс" }
  ],
  coreStack: [
    { name: "C# / .NET 8", note: "ASP.NET Core, async/await, LINQ" },
    { name: "EF Core + PostgreSQL", note: "Fluent-конфигурации, индексы, миграции" },
    { name: "MediatR + FluentValidation", note: "CQRS-команды и запросы, инварианты домена" },
    { name: "Kafka · RabbitMQ", note: "Producer с trace-контекстом, RPC-очередь" },
    { name: "Docker Compose", note: "Postgres → миграции → API, health checks" },
    { name: "Serilog · OpenTelemetry", note: "Структурные логи, трейсы, метрики" }
  ]
};

// =========================================================================
// LAB: DrugsEngine — разбор по реальному коду
// =========================================================================
const drugsEngineLab = {
  title: "DrugsEngine",
  tagline: "Агрегатор цен и наличия лекарств в аптеках с семантическим поиском аналогов",
  problem:
    "Парсеры собирают каталоги аптечных сетей, .NET-сервис нормализует их в PostgreSQL и публикует " +
    "препараты в Kafka. Python-сервис строит эмбеддинги (LaBSE) и кладёт их в Qdrant, чтобы искать " +
    "аналоги по смыслу описания, а не по точному совпадению названия.",
  repos: [
    { label: "DrugsEngine (.NET)", url: REPO, note: `код ниже — ветка ${REPO_BRANCH}` },
    { label: "DrugsEnginePythonService", url: PY_REPO, note: "векторизация и поиск" },
    { label: "DrugsEngine.Web", url: "https://github.com/Asm-o-Dan/DrugsEngine.Web", note: "Next.js-клиент" }
  ],
  numbers: [
    { value: "3", label: "слоя: Domain, Application, Infrastructure (API + DAL)" },
    { value: "42", label: "unit-теста: доменные сущности, value objects, KafkaProducer" },
    { value: "20", label: "исправлений после код-ревью, каждое отдельным коммитом" },
    { value: "3", label: "сервиса в Compose: Postgres, миграции, API" }
  ],
  // Поток данных: узлы схемы
  flow: [
    { id: "parsers", label: "Парсеры аптек", sub: "VivaFarm, Doctor", lang: "C#" },
    { id: "app", label: "MediatR-команды", sub: "CreateOrUpdate…", lang: "C#" },
    { id: "pg", label: "PostgreSQL", sub: "EF Core, UoW", lang: "DB" },
    { id: "kafka", label: "Kafka topic", sub: "drugs", lang: "MQ" },
    { id: "py", label: "Python consumer", sub: "LaBSE эмбеддинги", lang: "Py" },
    { id: "qdrant", label: "Qdrant", sub: "cosine search", lang: "DB" }
  ],
  layers: [
    {
      id: "domain",
      flowIds: ["app"],
      name: "Domain",
      rule: "Без EF Core и ASP.NET: только FluentValidation, ISO3166",
      desc:
        "Сущности проверяют себя сами: валидатор запускается в конструкторе и в каждом методе, меняющем " +
        "состояние, поэтому невалидный DrugItem нельзя создать. Изменение цены и остатка порождает доменное событие. " +
        "Равенство value objects считается через GetEqualityComponents без рефлексии.",
      points: [
        "BaseEntity<T>: Id, валидация, список доменных событий",
        "Value objects: Address, Email",
        "Тесты: Domain.Tests/Entities — сущности и value objects"
      ],
      file: "Domain/Entities/DrugItem.cs",
      url: `${REPO_BLOB}/Domain/Entities/DrugItem.cs`,
      lang: "C#",
      code: `public class DrugItem : BaseEntity<DrugItem>
{
    public DrugItem(Guid drugId, Guid drugStoreId, double count, decimal cost,
                    Drug? drug = null, DrugStore? drugStore = null)
    {
        DrugId = drug != null && drug.Id != Guid.Empty ? drug.Id : drugId;
        DrugStoreId = drugStore != null && drugStore.Id != Guid.Empty ? drugStore.Id : drugStoreId;
        Count = count;
        Cost = cost;
        Drug = drug;
        DrugStore = drugStore;
        ValidateEntity(new DrugItemValidator());
    }

    public void UpdateDrugCountAndCost(double count, decimal cost)
    {
        Count = count;
        Cost = cost;
        ValidateEntity(new DrugItemValidator());
        AddDomainEvent(new DrugItemUpdatedEvent());
    }
}`
    },
    {
      id: "application",
      flowIds: ["app"],
      name: "Application",
      rule: "Проектная ссылка только на Domain",
      desc:
        "Сценарии оформлены как команды и запросы MediatR, доступ к данным идёт через интерфейсы с раздельным " +
        "чтением и записью (IReadRepository / IWriteRepository) и IUnitOfWork. Upsert позиции сначала " +
        "получает реальные Id препарата и аптеки, затем обновляет или создаёт запись одним SaveChanges.",
      points: [
        "Раздельные интерфейсы чтения и записи для каждого агрегата",
        "Один SaveChangesAsync на сценарий — без частичной записи",
        "OData-запросы вынесены в API (коммит 9928b2e); остатки EF Core и OData в IUnitOfWork и CreateDrugCommandHandler — следующий шаг"
      ],
      file: "Application/UseCases/Commands/DrugItemCommands/CreateOrUpdateDrugItemCommandHandler.cs",
      url: `${REPO_BLOB}/Application/UseCases/Commands/DrugItemCommands/CreateOrUpdateDrugItemCommandHandler.cs`,
      lang: "C#",
      code: `public async Task<Unit> Handle(CreateOrUpdateDrugItemCommand request, CancellationToken ct)
{
    var drugItem = request.DrugItem;

    // Парсер создаёт Drug в памяти с новым Guid, которого нет в БД:
    // CreateOrGet находит существующую запись или создаёт её и возвращает настоящий Id.
    var drugId = drugItem.Drug != null
        ? await _mediator.Send(new CreateOrGetDrugCommand(drugItem.Drug), ct)
        : drugItem.DrugId;
    var drugStoreId = drugItem.DrugStore != null
        ? await _mediator.Send(new CreateOrGetDrugStoreCommand(drugItem.DrugStore), ct)
        : drugItem.DrugStoreId;

    var existing = await _drugItemReadRepository.GetByDrugAndPharmacyAsync(drugId, drugStoreId, ct);
    if (existing != null)
    {
        existing.UpdateDrugCountAndCost(drugItem.Count, drugItem.Cost);
        await _drugItemWriteRepository.UpdateAsync(existing, ct);
    }
    else
    {
        drugItem.DrugId = drugId;
        drugItem.DrugStoreId = drugStoreId;
        await _drugItemWriteRepository.AddAsync(drugItem, ct);
    }

    await _unitOfWork.SaveChangesAsync(ct);
    return Unit.Value;
}   // сокращено: логирование и проверка пустых Id`
    },
    {
      id: "infrastructure",
      flowIds: ["pg", "parsers"],
      name: "Infrastructure · DAL",
      rule: "EF Core, Npgsql, ASP.NET Core, OData",
      desc:
        "DbContext с Fluent-конфигурациями на каждую сущность. Ограничения целостности заданы в базе, " +
        "а не только в коде: уникальный составной индекс не даст завести дубль «препарат + аптека» даже при гонке " +
        "двух парсеров. REST API с OData-фильтрацией для каталога препаратов.",
      points: [
        "Уникальный индекс (DrugId, DrugStoreId) и индекс по Drug.Name",
        "DeleteBehavior.Restrict для справочника стран",
        "Email маппится через ValueConverter, у UserProfile.ExternalId уникальный индекс"
      ],
      file: "Infrastructure/Dal/Configurations/DrugItemConfiguration.cs",
      url: `${REPO_BLOB}/Infrastructure/Dal/Configurations/DrugItemConfiguration.cs`,
      lang: "C#",
      code: `public class DrugItemConfiguration : IEntityTypeConfiguration<DrugItem>
{
    public void Configure(EntityTypeBuilder<DrugItem> builder)
    {
        builder.ToTable(nameof(DrugItem));
        builder.HasKey(d => d.Id);

        // Одна позиция на пару «препарат + аптека» — гарантирует база, а не код
        builder.HasIndex(di => new { di.DrugId, di.DrugStoreId })
            .IsUnique();

        builder.HasOne(d => d.Drug)
            .WithMany(d => d.DrugItems)
            .HasForeignKey(di => di.DrugId);

        builder.HasOne(d => d.DrugStore)
            .WithMany(d => d.DrugItems)
            .HasForeignKey(d => d.DrugStoreId);
    }
}`
    },
    {
      id: "kafka",
      flowIds: ["kafka"],
      name: "Интеграция · Kafka",
      rule: "Confluent.Kafka + OpenTelemetry",
      desc:
        "После сохранения препарат публикуется в топик. Продюсер не блокирует поток: результат доставки " +
        "приходит в delivery report и попадает в метрики. W3C traceparent кладётся в заголовки сообщения, " +
        "поэтому трейс продолжается в Python-сервисе. Продюсер покрыт 22 тестами.",
      points: [
        "Топик и брокер берутся из конфигурации с запасными ключами окружения",
        "Счётчики отправленных сообщений и ошибок в OpenTelemetry Metrics",
        "Безопасный Dispose через Interlocked"
      ],
      file: "Infrastructure/Kafka/KafkaProducer.cs",
      url: `${REPO_BLOB}/Infrastructure/Kafka/KafkaProducer.cs`,
      lang: "C#",
      code: `using var activity = DrugsEngineTelemetry.KafkaActivitySource
    .StartActivity("Kafka.ProduceDrug", ActivityKind.Producer);
activity?.SetTag("messaging.destination.name", _topic);

var headers = new Headers();
if (activity?.Id != null)
    headers.Add("traceparent", Encoding.UTF8.GetBytes(activity.Id));

var message = new Message<Null, string>
{
    Value = JsonSerializer.Serialize(drug, JsonOptions),
    Headers = headers
};

_producer.Produce(_topic, message, report =>
{
    if (report.Error.IsError)
        DrugsEngineTelemetry.KafkaProduceErrorsCounter.Add(1);
    else
        DrugsEngineTelemetry.KafkaProducedCounter.Add(1);
});   // сокращено: логирование и обработка исключений`
    },
    {
      id: "vector",
      flowIds: ["py", "qdrant"],
      name: "Поиск · Python + Qdrant",
      rule: "FastAPI, sentence-transformers, qdrant-client",
      desc:
        "Consumer читает топик, дополняет описание препарата через LLM API и строит эмбеддинг моделью LaBSE " +
        "(многоязычная, подходит для русских названий). Векторы хранятся в коллекции Qdrant с косинусной метрикой. " +
        "Поиск повторяется с экспоненциальной задержкой и переподключается к Qdrant при сбое. Запросы на поиск " +
        "приходят через RabbitMQ по схеме RPC (reply_to + correlation_id).",
      points: [
        "Kafka consumer group drug-vectorization-group",
        "RabbitMQ: ack после обработки, nack без повтора для битых сообщений",
        "tenacity: 3 попытки, задержка 2–5 с"
      ],
      file: "app/services/qdrant_service.py",
      url: `${PY_BLOB}/app/services/qdrant_service.py`,
      lang: "Python",
      code: `@retry(stop=stop_after_attempt(3),
       wait=wait_exponential(multiplier=1, min=2, max=5))
def search_vector(self, vector, collection_name="drug_collection",
                  limit=5, score_threshold=None, **filters):
    if not self._validate_vector(vector, collection_name):
        return None

    search_params = {
        "collection_name": collection_name,
        "query_vector": vector,
        "limit": limit,
        "score_threshold": score_threshold,
        "with_payload": True,
    }
    if filters:
        search_params["query_filter"] = Filter(**self._build_filter(**filters))

    with self._client_lock:
        results = self.client.search(**search_params)
    return self._format_search_results(results)`
    },
    {
      id: "ops",
      flowIds: ["pg"],
      name: "Запуск · Docker Compose",
      rule: "Postgres → миграции → API",
      desc:
        "Порядок запуска задан явно: API стартует только после того, как база прошла healthcheck, " +
        "а отдельный контейнер применил миграции и завершился успешно. У API три эндпоинта здоровья " +
        "(/health, /health/live, /health/ready), каждый запрос получает Correlation ID.",
      points: [
        "Отдельный Dockerfile.migrations для dotnet ef database update",
        "Общая сеть shared_services_default с Python-сервисом и Qdrant",
        "Serilog с обогащением: машина, окружение, поток"
      ],
      file: "docker-compose.yml",
      url: `${REPO_BLOB}/docker-compose.yml`,
      lang: "YAML",
      code: `services:
  db:
    image: postgres:latest
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]

  migrations:
    build: { context: ., dockerfile: ./Infrastructure/Dockerfile.migrations }
    command: ["database", "update"]
    depends_on:
      db: { condition: service_healthy }

  app:
    build: { context: ., dockerfile: ./Infrastructure/Dockerfile }
    environment:
      - Kafka__BootstrapServers=\${KAFKA_BROKER:-kafka:9092}
    healthcheck:
      test: ["CMD-SHELL", "curl -f http://localhost:8080/api/Drug || exit 1"]
    depends_on:
      migrations: { condition: service_completed_successfully }`
    }
  ],
  // Журнал ревью: реальные коммиты из ветки рефакторинга
  reviewLog: [
    { sha: "04cad5f", area: "application", text: "Убрана двойная запись при загрузке препаратов: сохранение стало транзакционным" },
    { sha: "b017dc9", area: "dal", text: "UpdateAsync больше не меняет каскадно весь граф связанных сущностей" },
    { sha: "f874a54", area: "dal", text: "Уникальный составной индекс (DrugId, DrugStoreId) вместо проверки в коде" },
    { sha: "9928b2e", area: "api", text: "Убрано двойное выполнение OData-запроса, Application больше не зависит от OData" },
    { sha: "dd6dc9c", area: "domain", text: "Сравнение value objects без рефлексии — через GetEqualityComponents" },
    { sha: "50d925c", area: "dal", text: "DeleteBehavior.Restrict: удаление страны не уносит весь каталог" },
    { sha: "de3baf2", area: "parsing", text: "Списки аптек кешируются в памяти — лишние HTTP-запросы ушли" },
    { sha: "ae06ddb", area: "dal", text: "CancellationToken прокинут в запросы, добавлен индекс по Drug.Name" }
  ],
  next: [
    "CI в GitHub Actions: сборка и тесты на каждый push",
    "Интеграционные тесты репозиториев на Testcontainers + PostgreSQL",
    "Парсинг по расписанию (сейчас запускается один раз при старте API)",
    "Убрать из Application ссылки на EF Core и OData",
    "Слить ветку рефакторинга в main"
  ]
};

// =========================================================================
// ПРОЕКТЫ
// =========================================================================
const projectsData = [
  {
    id: "drugs-engine",
    title: "DrugsEngine",
    subtitle: "Агрегатор аптечных цен с семантическим поиском аналогов",
    description:
      "Сбор каталогов аптек, нормализация в PostgreSQL, публикация в Kafka и поиск аналогов по эмбеддингам в Qdrant.",
    stack: ["C#", ".NET 8", "ASP.NET Core", "EF Core", "PostgreSQL", "MediatR", "Kafka", "Docker", "Python", "Qdrant"],
    githubUrl: REPO,
    lab: true
  },
  {
    id: "lirix",
    title: "Lirix",
    subtitle: "Android-компаньон: тексты и аккорды поверх музыкального плеера",
    description:
      "Перехватывает медиа-события через NotificationListenerService, кеширует данные в локальной БД и показывает оверлей поверх других окон.",
    stack: ["Kotlin", "Android SDK", "Coroutines"],
    githubUrl: "https://github.com/Asm-o-Dan/lirix"
  },
  {
    id: "itskills-english-hub",
    title: "ITSkills English Hub",
    subtitle: "Учебный сервис для студентов академии ITSkills",
    description:
      "Карточки IT-терминов с озвучкой через Web Speech API. Используется на занятиях курса MIT App Inventor.",
    stack: ["JavaScript", "Web Speech API", "GitHub Pages"],
    githubUrl: "https://github.com/Asm-o-Dan/itskills-english-hub"
  },
  {
    id: "asia-capitals-quiz",
    title: "Asia Capitals Quiz",
    subtitle: "Справочник и викторина по 47 странам Азии",
    description: "SPA на Vue 2 с поиском по каталогу, игровым режимом и сохранением рекорда в localStorage.",
    stack: ["Vue.js 2", "Vue Router", "SCSS"],
    githubUrl: "https://github.com/Asm-o-Dan/Final_Work"
  }
];

// =========================================================================
// СТЕК (для Досье)
// =========================================================================
const skillsData = [
  { category: "Язык и платформа", items: ["C#", ".NET 8", "ASP.NET Core Web API", "LINQ", "async/await", "xUnit"] },
  { category: "Данные", items: ["PostgreSQL", "EF Core (Fluent API, миграции)", "Qdrant"] },
  { category: "Архитектура", items: ["Clean Architecture", "CQRS (MediatR)", "FluentValidation", "REST, OData", "Domain events"] },
  { category: "Интеграция и эксплуатация", items: ["Kafka", "RabbitMQ", "Docker, Docker Compose", "Serilog", "OpenTelemetry", "Git, GitFlow"] },
  { category: "Дополнительно", items: ["Python (FastAPI)", "Kotlin (Android)", "JavaScript, Vue 2"] }
];

// =========================================================================
// ОПЫТ И ОБРАЗОВАНИЕ
// =========================================================================
const timelineData = [
  {
    period: "2024",
    role: "Стажёр C# .NET Backend Developer",
    company: "DEX Technology",
    type: "Стажировка",
    highlights: [
      "Командная разработка серверных модулей на C# по Scrum.",
      "GitLab и GitFlow, модульные тесты, регулярное код-ревью."
    ]
  },
  {
    period: "2023 — сейчас",
    role: "Преподаватель программирования и робототехники",
    company: "ITSkills Academy",
    type: "Работа",
    highlights: [
      "Учу школьников и студентов алгоритмам, ООП и логике приложений.",
      "Сделал ITSkills English Hub для изучения IT-лексики на занятиях."
    ]
  },
  {
    period: "2023 — 2027",
    role: "«Программная инженерия», бакалавриат, 3 курс",
    company: "ПГУ им. Т.Г. Шевченко",
    type: "Образование",
    highlights: ["Структуры данных, алгоритмы, базы данных, архитектура ЭВМ. Диплом признаётся в РФ."]
  }
];

if (typeof window !== "undefined") {
  window.ASM_PORTFOLIO = { engineerProfile, drugsEngineLab, projectsData, skillsData, timelineData };
}
