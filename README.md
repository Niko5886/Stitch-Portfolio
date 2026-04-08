# Дигиталният Архитект - Портфолио Сайт

## 📋 Описание

Съвременен, модерен портфолио сайт на висок клас за дигитально студио "Дигиталният Архитект". Проектирано с последни UX/UI тренди и технологии.

## 🎯 Основни Функции

- **Лого Дизайн** - Визуални идентичности от висок клас
- **Модерна Уеб Разработка** - TypeScript, React, Tailwind CSS
- **Дигитален Маркетинг** - Стратегии за растеж и видимост
- **AI Интеграция** - Изкуствен интелект в бизнес процесите

## 🏗️ Структура на Проекта

```
Stitch_portfolio/
├── index.html              # Главна страница
├── package.json            # NPM конфигурация
├── tailwind.config.js      # Tailwind CSS конфигурация
├── css/
│   └── styles.css          # Глобални стилове
├── js/
│   └── script.js           # Функционалност и интерактивност
└── copilot_instructions.md # Инструкции и правила
```

## 🛠️ Технологичен Стек

### Фронтенд
- **HTML5** - Семантична структура
- **Tailwind CSS** - Utility-first CSS фреймворк
- **TypeScript** - Готов за интеграция
- **Google Fonts** - Space Grotesk и Manrope типографии
- **Material Symbols** - Икони от Google

### Инструменти
- **Tailwind CLI** - За изграждане и минификация
- **npm** - Пакетен мениджър
- **Git** - Контрол на версиите

## 🎨 Дизайн Система

### Цветова Палета
- **Първичен цвят** (`primary`): `#c3f5ff` (Cyan)
- **Контейнер цвят** (`primary-container`): `#00e5ff` (Bright Cyan)
- **Фон** (`surface`): `#101319` (Почти черно)
- **Текст** (`on-surface`): `#e1e2ea` (Светлосив)

### Типография
- **Заглавия** (`Space Grotesk`) - Геометрична и модерна
- **Тяло текст** (`Manrope`) - Четима и приятна

### Гранични радиуси
- Default: `1rem`
- Large: `2rem`
- XL: `3rem`

## 📱 Отзивчив Дизайн

- **Mobile First** подход
- **Breakpoints**: sm, md (768px), lg (1024px)
- **Гъвкав GridSystem** за различни разрешения

## 🚀 Начало

### Инсталация на зависимости
```bash
npm install
```

### Разработка
```bash
npm run dev
```
Това стартира Tailwind CSS файл watcher.

### Продаксион Build
```bash
npm run build
```
Това минифицира CSS файла за продукшн.

### Локален Server
```bash
npm run serve
```

## 📄 Страници и Разделяне

1. **Начало** - Hero секция с основна информация
2. **Проекти** - Bento-inspired грид от проекти:
   - NEURAL_OS (AI Integration)
   - CYBER_VAULT (Web Development)
   - LUMINA BRANDING (Logo Design)
   - TERRA_STRAT (Automation)

3. **Услуги** - Четири-стъпков процес:
   - 01 Анализ
   - 02 Дизайн
   - 03 Код
   - 04 Растеж

4. **Контакти** - Форма за запитване с валидация

## 🔧 Функционалност

### JavaScript Features
- ✅ Гладко плъзгане между секции
- ✅ Мобилна навигационна опция
- ✅ Валидация на форма
- ✅ Анимации при скролване
- ✅ Интерактивни елементи

### CSS Ефекти
- ✅ Glow текстови ефекти
- ✅ Blur фонове
- ✅ Градиентни преходи
- ✅ Hover анимации
- ✅ Glass-morphism UI елементи

## 📋 Инструкции за Разработка

### Добавяне на нов проект в Bento грид

Всеки проект има следната структура:
```html
<div class="lg:col-span-8 group relative overflow-hidden rounded-lg bg-surface-container-low p-8 h-[500px] border">
  <!-- Background Image -->
  <div class="absolute inset-0 opacity-40 grayscale group-hover:grayscale-0 bg-cover bg-center" style="background-image: url('...')"></div>
  
  <!-- Overlay Gradient -->
  <div class="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent"></div>
  
  <!-- Content -->
  <div class="relative h-full flex flex-col justify-end">
    <span class="text-[#00E5FF] font-label text-xs">КАТЕГОРИЯ</span>
    <h3 class="text-4xl font-headline font-bold">ПРОЕКТ НАЗВАНИЕ</h3>
    <p class="text-on-surface-variant">Описание...</p>
    <a href="#" class="flex items-center gap-4 text-primary font-headline font-bold">
      ВИЖ ДЕТАЙЛИ <span class="material-symbols-outlined">arrow_forward</span>
    </a>
  </div>
</div>
```

### Персонализиране на Цветовете

Редактирайте `tailwind.config.js` в секцията `colors` за промяна на цветовата схема.

## 📞 Контактна Форма

Формата включва:
- Поле за име
- Имейл с валидация
- Избор на вид проект
- Текстова площ за съобщение
- Submit бутон

Текущо форма показва alert при успешно изпращане. За true функционалност, добавете:
- Backend API endpoint
- Email сервис интеграция (SendGrid, Nodemailer, и т.н.)

## 🎨 Модун Дизайн Компоненти

Всички компоненти са построени с модулна структура:
- **Навигация** - Фиксирана на върха
- **Hero** - Пълноекранна секция
- **Проекти** - Гридна система
- **Услуги** - Четири-колонна архитектура
- **Форма** - Отзивчива и валидирана
- **Footer** - С линкове и информация
- **Mobile Nav** - Bottom приложен для мобилни устройства

## 📱 Мобилна Оптимизация

- Скрит при малки екрани горен ningNavBar
- Bottom Mobile Navigation Bar за телефони
- Гъвкав текст за различни разрешения
- Сензорни-приятни бутони и интерактивни елементи

## 🔐 Best Practices

✅ Семантичен HTML
✅ Достъпност (ARIA labels)
✅ Производителност (CSS минификация, оптимизирани изображения)
✅ SEO готовност
✅ Mobile-first дизайн
✅ Модулна архитектура

## 📝 Лицензия

MIT License - свободна употреба с кредит на авторите

## 👨‍💼 Контактна Информация

**Дигиталният Архитект**
- 📧 Email: contact@digitalnyat-arhitekt.bg
- 💼 Портфолио: https://portfolio-site.bg
- 📱 Мобилен: +359 XXX XXX XXX

---

**Развивано с 💙 и современни технологии**
