# Testing webpack + React

En esta documentación se busca mostrar los pasos para configurar desde _0_ un proyecto con la libreria de React.js + the Webpack bundler como empaquetador principal.

## Pasos:

1.  Crear una carpeta donde estarán todos los archivos del proyecto -> `mkdir project-name`
2.  Ir a la carpeta del proyecto con el comando -> `cd project-name`
3.  Inicializar con GIT -> `git init`
4.  Inicializar con NPM -> `npm init -y` o `npm init`
5.  Instalar las dependencias necesarias de Webpack -> `npm install webpack webpack-cli --save-dev`
6.  Crear la siguiente estructura para el directorio:

        |-src/
        	|-components
        		|-App.jsx
          	|-index.js
        |-public/
        	|-index.html
        |-.gitignore
        |-README.md

7.  En el `index.html` crear la estructura básica y crear un div con el id app
8.  Instalar dependencias de react -> `npm install --save react react-dom`
9.  Instalar dependencias para babel -> `npm install --save-dev @babel/core @babel/preset-env @babel/preset-react babel-loader`
10. Crear un archivo `.babelrc` y agregar lo siguiente:

        {
        	"presets": ["@babel/preset-env", "@babel/preset-react"]
        }

11. Agregar en el `src/components/App.jsx` lo siguiente

        const App = () => {
        	return (
        		<>
        			<h1>Hello world</h1>
        			<p>from React.js</p>
        		</>
        	)
        }
        export default App

12. En el src/index.js agregar lo siguiente:

        import React from 'react';
        import { createRoot } from 'react-dom/client';
        import App from './components/App';

        const root = createRoot(document.getElementById('app'));
        root.render(
        	<App />
        );

13. Agregar un archivo `webpack.config.js` en el root del proyecto y en el poner esto:

        const path = require("path");

        module.exports = {
          entry: "./src/index.js",
          output: {
            path: path.resolve(__dirname, "dist"),
            filename: "bundle.js",
          },
          resolve: {
            extensions: [".js", ".jsx"],
          },
          module: {
            rules: [
              {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                },
              },
            ],
          },
        };

14. Agregar el siguiente script en el package.json:

        "scripts": {
        	"build": "webpack --mode production"
        },

Hasta este punto ya se puede ejecutar un `npm run build` y se creara un dist/bundle.js con el resultado de la transpilacion de nuestro react

15. Agregar el script para modo de desarrollo:

        "scripts": {
        	"dev": "webpack --mode development"
        },

16. Instalar los siguientes plugins para html -> `npm install --save-dev html-webpack-plugin html-loader`
17. Agregar lo siguiente al `webpack.config.js`

        const HtmlWebpackPlugin = require("html-webpack-plugin");
        module.exports = {
          	rules: [
              	{
                	test: /\.html$/,
                	use: [
                  		{
                    		loader: "html-loader",
                  		},
                	],
              	},
            ],
          	plugins: [
            	new HtmlWebpackPlugin({
              		template: "./public/index.html",
              		filename: "index.html",
            	}),
          	],
        };

el resultado:

    	const path = require("path");
    	const HtmlWebpackPlugin = require("html-webpack-plugin");

    	module.exports = {
    		entry: "./src/index.js",
    		output: {
    			path: path.resolve(__dirname, "dist"),
    			filename: "bundle.js",
    		},
    		resolve: {
    			extensions: [".js", ".jsx"],
    		},
    		module: {
    			rules: [
    				{
    					test: /\.(js|jsx)$/,
    					exclude: /node_modules/,
    					use: {
    						loader: "babel-loader",
    					},
    				},
    				{
    					test: /\.html$/,
    					use: [
    						{
    							loader: "html-loader",
    						},
    					],
    				},
    			],
    		},
    		plugins: [
    			new HtmlWebpackPlugin({
    				template: "./public/index.html",
    				filename: "index.html",
    			}),
    		],
    	};

18. Instalar la siguiente dependencia para crear un servidor local -> `npm install --save-dev webpack-dev-server`
19. crear un archivo en el root del proyecto llamado `webpack.config.dev.js`, donde vivira la configuración de un entorno de desarrollo. poner lo siguiente en él:

        const path = require("path");
        const HtmlWebpackPlugin = require("html-webpack-plugin");
        module.exports = {
        	entry: "./src/index.js",
        	output: {
        		path: path.resolve(__dirname, "dist"),
        		filename: "bundle.js",
        	},
        	mode: 'development',
        	resolve: {
        		extensions: [".js", ".jsx"],
        	},
        	module: {
        		rules: [
        			{
        				test: /\.(js|jsx)$/,
        				exclude: /node_modules/,
        				use: {
        					loader: "babel-loader",
        				},
        			},
        			{
        				test: /\.html$/,
        				use: [
        					{
        						loader: "html-loader",
        					},
        				],
        			},
        		],
        	},
        	plugins: [
        		new HtmlWebpackPlugin({
        			template: "./public/index.html",
        			filename: "index.html",
        		}),
        	],
        	devServer: {
        		static: {
        			directory: path.join(__dirname, "dist"),
        			watch: true
        		},
        		watchFiles: path.join(__dirname, "./**"),
        		compress: true,
        		historyApiFallback: true,
        		port: 3006,
        		open: false,
        	}
        };

20. Agregar el siguiente script y modificar el de dev:

        "scripts": {
        	...
        	"dev": "webpack --config webpack.config.dev.js",
        	"start": "webpack server --config webpack.config.dev.js"
        },

21. modificar el `webpack.config.js`

        ...
        module.exports = {
        	....
        	output: {
        		...
        	},
        	mode: 'production',
        	...
        };

22. También hay que modificar el script del `package.json`

        "scripts": {
        	"build": "webpack --config webpack.config.js",
        	...
        },
