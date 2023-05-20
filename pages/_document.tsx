import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="vi">
      <Head>
        <link rel="icon" href="/icon/logo.png" sizes="32x32" />
        <link rel="icon" href="/icon/logo.png" sizes="192x192" />
          <script
              dangerouslySetInnerHTML={{
                  __html: `
            var chatbox = document.getElementById('fb-customer-chat');
            chatbox.setAttribute("page_id", "1447139348842481");
            chatbox.setAttribute("attribution", "biz_inbox");
            window.fbAsyncInit = function() {
              FB.init({
                xfbml            : true,
                version          : 'v14.0'
              });
            };
            (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
            `,
              }}
          />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
