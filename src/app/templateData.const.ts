export const templateData = {
  'tenant': {
    'css': '\n      body {\n        font-family: sans-serif, Arial;\n        margin: 0;\n        background-color: lightgray;\n      }\n      h1 {\n        margin: 0;\n        padding: 20px 0;\n        text-align: center;\n      }\n  '
  },
  'nodes': [
    {
      'id': 1,
      'title': 'Page #1 or page-a',
      'content': {
        'html': '\n        <h2>Links</h2>\n        <ul>\n          <li><a href=\"/\">Home (/)</a></li>\n          <li><a href=\"javascript:window.history.back();\">Javascript back (window.history.back()</a></li>\n          <li><a href=\"homepage\">Homepage as url (homepage)</a></li>\n          <li><a href=\"page-a\">Page A as url (page-a)</a></li>\n          <li><a href=\"page-b\">Page B as url (page-b)</a></li>\n          <li><a href=\"page-c\">Page C as url (page-c)</a></li>\n        </ul>\n      ',
        'dog_names': [
          'Bella',
          'Buddy',
          'Max',
          'Molly',
          'Chloe'
        ]
      },
      'parent': {
        'name': 'homepage',
        'title': 'Homepage'
      },
      'children': [{
        'name': 'page-c',
        'title': 'Page #4 or page-c'
      }],
      'ancestry': '3',
      'ordering': 0,
      'name': 'page-a',
      'template_id': 4,
      'layout_id': 1
    },
    {
      'id': 2,
      'title': 'Page #2 or page-b',
      'content': {
        'html': '\n      <h2>Links</h2>\n      <ul>\n        <li><a href=\"/\">Home (/)</a></li>\n        <li><a href=\"javascript:window.history.back();\">Javascript back (window.history.back()</a></li>\n        <li><a href=\"homepage\">Homepage as url (homepage)</a></li>\n        <li><a href=\"page-a\">Page A as url (page-a)</a></li>\n        <li><a href=\"page-b\">Page B as url (page-b)</a></li>\n        <li><a href=\"page-c\">Page C as url (page-c)</a></li>\n      </ul>\n    ',
        'cat_names': [
          'Bella',
          'Tiger',
          'Chloe',
          'Shadow',
          'Luna',
          'Oreo'
        ]
      },
      'ancestry': null,
      'ordering': 2,
      'name': 'page-b',
      'template_id': 3,
      'layout_id': 2
    },
    {
      'id': 3,
      'title': 'Homepage',
      'content': {
        'html': '\n      <p>This is the homepage because it has <code>ancestry</code> of <code>null</code> AND it has the lowest ordering</p>\n      <h2>Links</h2>\n      <ul>\n        <li><a href=\"/\">Home (/)</a></li>\n        <li><a href=\"javascript:window.history.back();\">Javascript back (window.history.back()</a></li>\n        <li><a href=\"homepage\">Homepage as url (homepage)</a></li>\n        <li><a href=\"page-a\">Page A as url (page-a)</a></li>\n        <li><a href=\"page-b\">Page B as url (page-b)</a></li>\n        <li><a href=\"page-c\">Page C as url (page-c)</a></li>\n        <li><a href=\"unknownpage\">This is a broken link</a></li>\n      </ul>\n    ',
        'cat_names': [
          'Oliver',
          'Kitty',
          'Lucy',
          'Molly'
        ]
      },
      'children': [{
        'name': 'page-a',
        'title': 'Page #1 or page-a'
      }],
      'ancestry': null,
      'ordering': 0,
      'name': 'homepage',
      'template_id': 3,
      'layout_id': 1
    },
    {
      'id': 4,
      'title': 'Page #4 or page-c',
      'content': {
        'html': '\n      <h1>This is page #4 also known as page c!</h1>\n      <h2>Links</h2>\n      <ul>\n        <li><a href=\"/\">Home (/)</a></li>\n        <li><a href=\"javascript:window.history.back();\">Javascript back (window.history.back()</a></li>\n        <li><a href=\"homepage\">Homepage as url (homepage)</a></li>\n        <li><a href=\"page-a\">Page A as url (page-a)</a></li>\n        <li><a href=\"page-b\">Page B as url (page-b)</a></li>\n        <li><a href=\"page-c\">Page C as url (page-c)</a></li>\n      </ul>\n    ',
        'dog_names': [
          'Roxy',
          'Jack',
          'Coco',
          'Lola',
          'Daisy'
        ]
      },
      'ancestry': '3/1',
      'ordering': 0,
      'name': 'page-c',
      'template_id': 4,
      'layout_id': 2
    }
  ],
  'templates': [
    {
      'id': 1,
      'name': 'Layout #1',
      'template_type': 'layout',
      'content': '\n      <div class=\"header\">\n        <h1><%= node.title %></h1>\n      </div>\n      <div class=\"body\">\n        <div class=\"navigation\">\n          <% if (node.parent) { %>\n            <p>Parent Page</p>\n            <p>\n              <a href=\"<%=node.parent.name%>\">\n                <%=node.parent.title%>\n              </a>\n            </p>\n          <% } %>\n          <% if (node.children.length) { %>\n            <p>Child Pages</p>\n            <ul>\n              <% _.each(node.children, function(child) { %>\n                <li>\n                  <a href=\"<%= child.name %>\">\n                    <%= child.title %>\n                  </a>\n                </li>\n              <% }) %>\n            </ul>\n          <% } %>\n        </div>\n        <div class=\"content\">\n        \n      <p>THis is view #2</p>\n      <%= node.content.html %>\n      <h3>This View deals with dog names</h3>\n      <ol>\n      <% _.each(node.content.dog_names, function(dog_name) { %>\n        <li><%=dog_name%></li>\n      <%});%>\n      </ol>\n      </div>\n      </div>\n    ',
      'css': '\n      .header {\n        background-color: blue;\n      }\n      .header h1 {\n        font-size: 30px;\n      }\n      .body {\n        display: flex;\n      }\n      .body .navigation {\n        width: 15vw;\n      }\n      .body .content  {\n        background-color: white;\n        flex-grow: 2;\n      }\n    ol {\n          margin: 2em;\n        }\n        ol > li {\n          color: brown;\n        }\n'
    },
    {
      'id': 2,
      'name': 'Layout #2',
      'template_type': 'layout',
      'content': '\n      <div class="header">\n        <h1><%= node.title %></h1>\n      </div>\n      <div class="body">\n    <p>THis is view #1 html is below</p>\n    <%= node.content.html %>\n    <h3>Here is a list of Cat Names found on this page</h3>\n    <ol>\n    <% _.each(node.content.cat_names, function(cat_name) { %>\n      <li><%=cat_name%></li>\n    <%});%>\n    </ol>\n    </div>\n  ',
      'css': '\n      .header {\n        background-color: green;\n      }\n      .header h1 {\n        font-size: 22px;\n      }\n      .body {\n        background-color: pink;\n      }\n    ol {\n          margin: 1em;\n        }\n   ol > li {\n          color: green;\n        }\n    '
    },
    {
      'id': 3,
      'name': 'View #1',
      'template_type': 'view',
      'content': '\n      <div class="header">\n        <h1><%= node.title %></h1>\n      </div>\n      <div class="body">\n        <div class="navigation">\n          <% if (node.parent) { %>\n            <p>Parent Page</p>\n            <p>\n              <a href="<%=node.parent.name%>">\n                <%=node.parent.title%>\n              </a>\n            </p>\n          <% } %>\n          <% if (node.children.length) { %>\n            <p>Child Pages</p>\n            <ul>\n              <% _.each(node.children, function(child) { %>\n                <li>\n                  <a href="<%= child.name %>">\n                    <%= child.title %>\n                  </a>\n                </li>\n              <% }) %>\n            </ul>\n          <% } %>\n        </div>\n        <div class="content">\n        \n          <p>THis is view #1 html is below</p>\n    <%= node.content.html %>\n    <h3>Here is a list of Cat Names found on this page</h3>\n    <ol>\n    <% _.each(node.content.cat_names, function(cat_name) { %>\n      <li><%=cat_name%></li>\n    <%});%>\n    </ol>\n      </div>\n      </div>\n    ',
      'css': '\n      .header {\n        background-color: blue;\n      }\n      .header h1 {\n        font-size: 30px;\n      }\n      .body {\n        display: flex;\n      }\n      .body .navigation {\n        width: 15vw;\n      }\n   .body .content  {\n        background-color: white;\n        flex-grow: 2;\n      }\n   ol {\n          margin: 1em;\n        }\n        ol > li {\n          color: green;\n        }\n    '
    }, //home
    {
      'id': 4,
      'name': 'View #2',
      'template_type': 'view',
      'content': '\n      <div class="header">\n        <h1><%= node.title %></h1>\n      </div>\n      <div class="body">\n    <p>THis is view #2</p>\n      <%= node.content.html %>\n      <h3>This View deals with dog names</h3>\n      <ol>\n      <% _.each(node.content.dog_names, function(dog_name) { %>\n        <li><%=dog_name%></li>\n      <%});%>\n      </ol>\n      </div>\n',
      'css': '\n.header {\n        background-color: green;\n      }\n      .header h1 {\n        font-size: 22px;\n      }\n       .body {\n        background-color: pink;\n      }\n        ol {\n          margin: 2em;\n        }\n        ol > li {\n          color: brown;\n        }\n    '
    } //page c
  ]
};
