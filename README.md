# 📖 Bible Ref

A quick Bible reference tool built with [Next.js](https://nextjs.org/) and [API.Bible](https://scripture.api.bible/).

## Requirements

| Dependency                    | Version  |
|-------------------------------|----------|
| [Node.js](https://nodejs.org) | ^18.16.1 |

## Getting Started

1. Copy `.env.example` to `.env.local` and update the values

        cp .env.example .env.local

2. Install the project dependencies

       npm install

3. Run the development server

       npm run dev

## Searching

Search for a chapter:

```
Gen 1
```

Search for a range of chapters:

```
Gen 1-2
```

Search for a verse:

```
Gen 1:1
```

Search for a range of verses:

```
Gen 1:1-2
```

Search across verses and chapters:

```
Gen 1:31-2:1
```

Specify a translation:

```
Gen 1:1, ASV
```

## Supported Translations

* American Standard Version (ASV)
* Berean Standard Bible (BSB) (default)
* King James Version (KJV)
* Literal Standard Version (LSV)
