export const instagramPlugin = (editor) => {
  editor.ui.registry.addButton("instagram", {
    text: "Instagram",
    onAction: function () {
      editor.windowManager.open({
        title: "Instagram Embed",
        body: {
          type: "panel",
          items: [
            {
              type: "textarea",
              height: "300px",
              name: "instagram",
              label: "Instagram embed code",
            },
          ],
        },
        buttons: [
          {
            type: "submit",
            name: "submitButton",
            text: "Embed",
            disabled: false,
            primary: true,
            align: "start",
          },
        ],
        onSubmit: function (e) {
          var data = e.getData();
          var embedCode = data.instagram;
          var script = embedCode.match(/<script.*<\/script>/)[0];
          var scriptSrc = script.match(/".*\.js/)[0].split('"')[1];
          var sc = document.createElement("script");
          sc.setAttribute("src", scriptSrc);
          sc.setAttribute("type", "text/javascript");

          var iframe = document.getElementById(editor_id + "_ifr");
          var iframeHead =
            iframe.contentWindow.document.getElementsByTagName("head")[0];

          tinyMCE.activeEditor.insertContent(data.instagram);
          iframeHead.appendChild(sc);
          e.close();
        },
      });
    },
  });
};
