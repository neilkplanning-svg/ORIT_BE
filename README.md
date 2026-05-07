# אתר משרד עו"ד אורית בן אלי
## גרסה 2.0 | מאי 2026

---

## 📁 מבנה הקבצים

```
orit-beneli-website/
├── index.html              # דף הבית
├── robots.txt              # SEO
├── sitemap.xml             # מפת האתר (8 עמודים)
├── manifest.json           # PWA
├── README.md               # קובץ זה
├── deploy.cmd              # סקריפט עדכון מהיר ל-GitHub
│
├── css/
│   └── styles.css          # עיצובים + תפריט נגישות
│
├── js/
│   ├── main.js             # פונקציונליות כללית
│   └── accessibility.js    # תפריט נגישות מתקדם (תקן ת"י 5568)
│
├── images/                 # לוגו, תמונות, תעודות, המלצות, מאמרים
│
└── pages/
    ├── blog.html           # רשימת מאמרים
    ├── article-poa.html    # מאמר: ייפוי כוח מתמשך
    ├── article-success.html# מאמר: סיפור הצלחה ביטוח לאומי
    ├── blog-article.html   # מאמר: זכויות נפגעי תאונות דרכים
    ├── privacy.html        # מדיניות פרטיות
    ├── terms.html          # תנאי שימוש
    └── accessibility.html  # הצהרת נגישות
```

---

## 🌐 כתובת האתר החיה

**https://neilkplanning-svg.github.io/ORIT_BE/**

---

# 🚀 עדכון האתר דרך CMD - מדריך מלא

## דרישות מקדימות (חד-פעמי)

### 1. התקנת Git ל-Windows
- הורד מ: https://git-scm.com/download/win
- התקן עם הגדרות ברירת מחדל
- לאחר ההתקנה, פתח **CMD חדש** ובדוק:
  ```cmd
  git --version
  ```
  אמור להופיע מספר גרסה (למשל `git version 2.45.0`).

### 2. הגדרת זהות Git (פעם אחת בלבד)
```cmd
git config --global user.name "Neil Kappel"
git config --global user.email "neilkappel@gmail.com"
```

### 3. אימות מול GitHub
פתח את https://github.com/settings/tokens ויצור **Personal Access Token (classic)** עם הרשאות `repo`. שמור את ה-token במקום בטוח - תזדקק לו בשליחה הראשונה (במקום סיסמה).

---

## 📤 שליחה ראשונה (אם הריפו עוד לא מקושר מקומית)

פתח CMD ונווט לתיקיית הפרויקט:
```cmd
cd /d C:\Projects\orit-beneli-website
```

חבר את הפרויקט ל-GitHub:
```cmd
git init
git branch -M main
git add .
git commit -m "Initial site upload"
git remote add origin https://github.com/neilkplanning-svg/ORIT_BE.git
git push -u origin main
```

> כש-Git יבקש סיסמה - הדבק את ה-Personal Access Token (לא סיסמת GitHub).

לאחר מספר דקות האתר יעלה לכתובת:
**https://neilkplanning-svg.github.io/ORIT_BE/**

> אם זו הפעם הראשונה: גש ל-GitHub → Repository → **Settings → Pages → Source: Branch `main` / `(root)` → Save**.

---

## 🔄 עדכון שוטף - 3 פקודות בלבד

לאחר כל שינוי בקובץ, פתח CMD בתיקיית הפרויקט והרץ:

```cmd
cd /d C:\Projects\orit-beneli-website
git add .
git commit -m "תיאור השינוי שביצעת"
git push
```

תוך 30-90 שניות האתר יתעדכן אוטומטית בכתובת ה-GitHub Pages.

---

## ⚡ סקריפט עדכון מהיר (deploy.cmd)

קובץ `deploy.cmd` כבר נמצא בתיקיית הפרויקט. כל מה שצריך:

1. לחיצה כפולה על הקובץ `deploy.cmd`, **או**
2. הקלדה ב-CMD:
   ```cmd
   cd /d C:\Projects\orit-beneli-website
   deploy.cmd "תיקון טקסט בעמוד הבית"
   ```

הסקריפט יעשה אוטומטית: `git add` → `git commit` → `git push`.

אם לא מספקים הודעת commit, יוקצה תאריך נוכחי כברירת מחדל.

---

## 🔍 פקודות שימושיות נוספות

| פקודה | מה היא עושה |
|---|---|
| `git status` | מציגה אילו קבצים שונו ומה מוכן לשליחה |
| `git diff` | מציגה את השינויים שביצעת בקבצים |
| `git log --oneline -10` | מציגה את 10 השינויים האחרונים |
| `git pull` | מורידה שינויים מ-GitHub (שימושי אם עורכים גם משם) |
| `git restore <file>` | מבטלת שינויים בקובץ ספציפי שעוד לא commit-ו |

---

## 🛠️ פתרון תקלות נפוצות

### `fatal: not a git repository`
הריצה מתבצעת מחוץ לתיקיית הפרויקט. הרץ:
```cmd
cd /d C:\Projects\orit-beneli-website
```

### `Authentication failed`
ה-token פג תוקף או שגוי. צור Token חדש ב-https://github.com/settings/tokens והכנס אותו במקום הסיסמה.

### `rejected - non-fast-forward`
מישהו עדכן את GitHub ישירות. הרץ:
```cmd
git pull --rebase
git push
```

### האתר לא מתעדכן
- ודא שלחצת על Push בהצלחה (`git push` בלי שגיאות)
- המתן 1-2 דקות ורענן את הדפדפן עם Ctrl+F5 (ניקוי מטמון)
- בדוק ב-GitHub: https://github.com/neilkplanning-svg/ORIT_BE/actions שהבילד הצליח (✓ ירוק)

---

## 📜 הוספת תוכן

### הוספת תעודה
1. שמור את הקובץ כ-`CER_X.jpg` (X = המספר הבא)
2. העתק ל-`images/`
3. הוסף את ה-HTML המתאים ב-`index.html` בסקציית `certificates-gallery`
4. הרץ `deploy.cmd "הוספת תעודה"`

### הוספת המלצה
1. שמור כ-`REC_X.jpg` והעבר ל-`images/`
2. הוסף ב-`index.html` ב-`real-testimonials`
3. `deploy.cmd "הוספת המלצה"`

### הוספת מאמר חדש
1. שכפל את `pages/article-poa.html` והגדר שם חדש (למשל `article-new.html`)
2. עדכן את התוכן, ה-`<title>`, ה-`<meta description>` וה-`canonical`
3. הוסף קישור ב-`pages/blog.html` וב-`index.html`
4. הוסף שורה ב-`sitemap.xml`
5. `deploy.cmd "הוספת מאמר חדש"`

---

## 📊 קידום אתרים בגוגל (SEO)

האתר מוכן ל-Google Search Console:

1. גש ל-https://search.google.com/search-console
2. הוסף נכס מסוג **URL prefix**: `https://neilkplanning-svg.github.io/ORIT_BE/`
3. אמת בעלות (קובץ HTML או tag - גוגל יספק)
4. שלח את ה-sitemap: `sitemap.xml`
5. בקש אינדוקס לעמוד הבית

המנגנונים שכבר פועלים באתר:
- ✅ Schema.org מסוג **LegalService** (פרטי המשרד, מיקום, שעות פעילות)
- ✅ Schema.org מסוג **FAQPage** (שאלות נפוצות בדף הבית)
- ✅ Schema.org מסוג **Article** בכל מאמר
- ✅ Open Graph + Twitter Cards (תצוגה נכונה ברשתות חברתיות)
- ✅ `robots.txt` ו-`sitemap.xml` מעודכנים
- ✅ Canonical URLs לכל עמוד
- ✅ Meta description ייחודי לכל עמוד
- ✅ מבנה כותרות תקני (H1, H2, H3)
- ✅ נגישות מלאה לפי WCAG 2.1 AA (גוגל מדרג גבוה אתרים נגישים)
- ✅ עיצוב רספונסיבי (Mobile-First Indexing)

---

## 📞 פרטי קשר

- **טלפון:** 03-7649005 | 052-946-4477
- **אימייל:** Oritbe76@gmail.com
- **כתובת:** שדרות המלאכות 21, מודיעין
- **מ.ר:** 96387

---

גרסה 2.0 | מאי 2026 | תפריט נגישות + SEO מקיף
