importScripts("https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js");

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyBUknTYf3TMbtrTC_7BtKPKbGpfwmIJPbc",
  projectId: "mungtivity",
  messagingSenderId: "328383190621",
  appId: "1:328383190621:web:75815f81277dd7484f9fb4",
};

// Firebase 앱 초기화
firebase.initializeApp(firebaseConfig);

// 메시징 객체 생성
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message', payload);

  const notificationTitle = payload.data.title;
  const notificationBody = payload.data.body;

  // 특정 메시지를 제외하고 알림을 표시
  if (notificationBody !== "이 사이트는 백그라운드에서 업데이트되었습니다.") {
    const notificationOptions = {
      body: notificationBody,
      icon: '/firebase-logo.png',
      data: {
        url: payload.data.url // 클릭 시 열 URL 전달
      }
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  }
});


// 알림 클릭 이벤트 처리
self.addEventListener('notificationclick', function(event) {
  console.log('Notification clicked:', event);

  event.notification.close();

  const urlToOpen = event.notification.data?.url || 'https://mungtivity.vercel.app';

  event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
          for (let client of windowClients) {
              if (client.url === urlToOpen && 'focus' in client) {
                  return client.focus();
              }
          }
          if (clients.openWindow) {
              return clients.openWindow(urlToOpen);
          }
      })
  );
});

// 서비스 워커 설치 시 로그
self.addEventListener('install', (event) => {
  console.log('Service Worker installed:', event);
});

// 서비스 워커 활성화 시 로그
self.addEventListener('activate', (event) => {
  console.log('Service Worker activated:', event);
});