async function treeBuilder() {
  try {
    const response = await fetch("./data.json");
    const data = await response.json();

    data.services.sort((a, b) => a.sorthead - b.sorthead);

    console.log(data.services);

    treeConstructor(data, 0);
  } catch (error) {
    console.log(`Got an error: ${error}`);
  }
}

function treeConstructor(data, root) {
  const rootId = root === 0 ? null : root;
  const treeBlock = document.getElementById(`${rootId}`);

  data.services.map((item) => {
    const itemPrice = item.price ? ` (${item.price.toFixed(1)})` : "";

    if (item.head === rootId) {
      if (item.node === 1) {
        const treeNode = document.createElement("li");

        treeNode.setAttribute("id", `${item.id}`);
        treeNode.classList.add("node");
        treeNode.innerHTML = `${item.name}${itemPrice}<ul></ul>`;

        if (treeBlock.firstElementChild && treeBlock.firstElementChild.tagName === "UL") {
          treeBlock.firstElementChild.append(treeNode);
        } else {
          treeBlock.append(treeNode);
        }

        // вызываем рекурсивно для каждого узла
        treeConstructor(data, item.id);
      } else {
        const treeNode = document.createElement("li");

        treeNode.setAttribute("id", `${item.id}`);
        treeNode.classList.add("list");
        treeNode.textContent = `${item.name}${itemPrice}`;

        if (treeBlock.firstElementChild && treeBlock.firstElementChild.tagName === "UL") {
          treeBlock.firstElementChild.append(treeNode);
        } else {
          treeBlock.append(treeNode);
        }
      }
    }
  });
}

treeBuilder();
