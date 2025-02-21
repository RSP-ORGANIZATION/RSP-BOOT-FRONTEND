const toastLiveExample = document.getElementById("liveToast");

// eslint-disable-next-line no-undef
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);

export function executeToast({
  title = "Epic Eats",
  content = "This is content",
}) {
  const thead = document.querySelector(".toast-header");
  const tbody = document.querySelector(".toast-body");

  thead.textContent = title;
  tbody.textContent = content;

  toastBootstrap.show();
}
