function TabsManager(el) {
	this.tabsContainers = document.querySelectorAll(el);
	this.init();
}

TabsManager.prototype.init = function () {
	var self = this;

	document.body.addEventListener("click", function (event) {
		var target = event.target;

		while (target !== document.body) {
			if (target.matches(".tabs-tags__tag")) {
				self.handleTabClick(target);
				return;
			}

			target = target.parentNode;
		}
	});

	self.tabsContainers.forEach(function (tabsContainer) {
		if (tabsContainer) {
			var contentTexts = tabsContainer.querySelectorAll(".tabs-content__text");
			contentTexts.forEach(function (text, index) {
				if (index !== 0) {
					text.style.display = "none";
				}
			});
			tabsContainer.querySelector(".tabs-tags__tag").classList.add("active");
		}
	});
};

TabsManager.prototype.handleTabClick = function (clickedTab) {
	var self = this;
	var tabsContainer = clickedTab.closest(".tabs");

	if (tabsContainer) {
		var contentTexts = tabsContainer.querySelectorAll(".tabs-content__text");
		var tags = tabsContainer.querySelectorAll(".tabs-tags__tag");
		var index = Array.from(tags).indexOf(clickedTab);
		contentTexts.forEach(function (text) {
			text.style.display = "none";
		});
		contentTexts[index].style.display = "block";
		tags.forEach(function (t) {
			t.classList.remove("active");
		});
		clickedTab.classList.add("active");
	}
};

// Инициализация объекта TabsManager
var tabsManager = new TabsManager(".tabs");
