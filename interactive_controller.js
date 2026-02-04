(() => {
  const application = Stimulus.Application.start();

  application.register("interactive", class extends Stimulus.Controller {
    static targets = ["header", "mobileMenu", "menuBtn", "navLinks"];

    connect() {
      this.setupScrollListener();
    }

    disconnect() {
      if (this.scrollHandler) {
        window.removeEventListener("scroll", this.scrollHandler);
      }
    }

    setupScrollListener() {
      this.scrollHandler = () => {
        if (this.hasHeaderTarget) {
          if (window.scrollY > 20) {
            this.headerTarget.classList.add("scrolled");
          } else {
            this.headerTarget.classList.remove("scrolled");
          }
        }
      };

      window.addEventListener("scroll", this.scrollHandler, { passive: true });
    }

    toggleMobileMenu(event) {
      event.preventDefault();

      if (this.hasMenuBtnTarget) {
        this.menuBtnTarget.classList.toggle("active");
      }

      if (this.hasMobileMenuTarget) {
        this.mobileMenuTarget.classList.toggle("active");
      }

      document.body.classList.toggle("menu-open");
    }

    closeMobileMenu() {
      if (this.hasMenuBtnTarget) {
        this.menuBtnTarget.classList.remove("active");
      }

      if (this.hasMobileMenuTarget) {
        this.mobileMenuTarget.classList.remove("active");
      }

      document.body.classList.remove("menu-open");
    }

    mobileNavClick(event) {
      event.preventDefault();
      this.closeMobileMenu();

      const href = event.currentTarget.getAttribute("href");
      if (href && href.startsWith("#")) {
        setTimeout(() => {
          const target = document.getElementById(href.substring(1));
          if (target) {
            const headerHeight = this.hasHeaderTarget ? this.headerTarget.offsetHeight : 80;
            const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
            window.scrollTo({ top, behavior: "smooth" });
          }
        }, 300);
      }
    }

    smoothScroll(event) {
      event.preventDefault();
      const href = event.currentTarget.getAttribute("href");

      if (href && href.startsWith("#")) {
        const target = document.getElementById(href.substring(1));
        if (target) {
          const headerHeight = this.hasHeaderTarget ? this.headerTarget.offsetHeight : 80;
          const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    }

    handleBooking(event) {
      event.preventDefault();
    }

    handleFormSubmit(event) {
      event.preventDefault();
      const form = event.target;
      const submitBtn = form.querySelector('.btn-submit');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<span>Sending...</span>';
      submitBtn.disabled = true;

      setTimeout(() => {
        form.reset();
        submitBtn.innerHTML = '<span>Request Submitted!</span>';

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 3000);
      }, 1500);
    }
  });

  application.register("faq", class extends Stimulus.Controller {
    connect() {
      this.isOpen = false;
    }

    toggle(event) {
      event.preventDefault();
      this.isOpen = !this.isOpen;
      this.element.classList.toggle("active", this.isOpen);
    }
  });
})();
