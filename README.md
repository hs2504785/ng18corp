# ROCH Corporation

```
npx nx-create-workspace@latest
```

## Dev

```
npm i
npm start
```

## Deploy

https://hs2504785.github.io/ng18corp/

```
sudo npm install -g angular-cli-ghpages
npm run deploy
```

## Feature

- ready to scale ( all features lazy loaded )
- libs ( for shared stuff, for single app, multi app or micro frontends )
- architecture ( that scales wel )
  - you have 3 levels to create scss, component/services/pipes etc
  - 1. feature level, for ex. product service used in products only listing page & details page.
  - 2. App level - can be reused across multiple featue but in single app (ng18corp in our case ) , you might have app level assets, scss, component/services/pipes etc.
  - 3. libs (assets, scss, component/services/pipes etc ) can be use in multiple app (ng18corp, admin, payment etc) - reusable components goes here, can be used inside any app, works wel with microfrontend.
- Global loader
  - on navigation
  - on http calls
- Global Cache interceptor ( by default cache GET request, can be avoided if needed )
- Global and app specific styles scss & assets
- Signal based state management
- Uncss - removed unused css ( although we are using bootstrap ~250kb ) but our application css is still under < 50kb
- Bundle analyzer
