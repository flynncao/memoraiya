# 🏷 Memoraiya

   Memoraiya allows users to to scrape definitions and examples from popular dictionaries, enhancing their dictionary experience.

## Ecoystem

* Obsidian Plugin(Under Development)

## Run Locally (dev mode)

Clone the project

~~~bash
  git clone https://link-to-project
~~~

Go to the project directory

~~~bash
  cd my-project
~~~

Install dependencies

~~~bash
npm install
~~~

Start the server

~~~bash
npm run start
~~~

## Run as a system service on Windows

Rename `example.nodeService.js` to `nodeService.js`, replace the bundled `/output/index.js` with absolute path on your computer.

```js
const svc = new service.Service({
  name: 'Memoraiya Core Service',
  description: 'Memoraiya Node Service',
  script: '****\\memoraiya\\server\\output\\index.js'
})
```

Register service by running `node nodeService.js`, then you can can check this "Memoraiya Core Service" in Windows Services Tool (win+R -> services.msc) up and running.

Also you can apply the same approach to unstall this Windows service.

> Notice: To achieve compatibility with certain apis, we have raised the minimum version requirement on Node.

## Tech Stack

**Client:** TypeScript, Vue

**Server:** Node, Express

## License

[MIT](https://choosealicense.com/licenses/mit/)
