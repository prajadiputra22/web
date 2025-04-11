document.addEventListener("DOMContentLoaded", () => {
    // Set current year in footer
    document.getElementById("current-year").textContent = new Date().getFullYear()
  
    // Header scroll behavior
    const header = document.getElementById("main-header")
    let prevScrollPos = window.scrollY
  
    window.addEventListener("scroll", () => {
      const currentScrollPos = window.scrollY
  
      // Show/hide header based on scroll direction
      if (prevScrollPos > currentScrollPos || currentScrollPos < 10) {
        header.style.transform = "translateY(0)"
      } else {
        header.style.transform = "translateY(-100%)"
      }
  
      prevScrollPos = currentScrollPos
    })
  
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById("mobile-menu-btn")
    const mobileMenu = document.getElementById("mobile-menu")
    const menuIcon = mobileMenuBtn.querySelector("i")
  
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("active")
  
      // Toggle menu icon
      if (mobileMenu.classList.contains("active")) {
        menuIcon.classList.remove("fa-bars")
        menuIcon.classList.add("fa-times")
      } else {
        menuIcon.classList.remove("fa-times")
        menuIcon.classList.add("fa-bars")
      }
    })
  
    // Close mobile menu when clicking on a nav link
    const mobileNavLinks = mobileMenu.querySelectorAll("a")
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active")
        menuIcon.classList.remove("fa-times")
        menuIcon.classList.add("fa-bars")
      })
    })
  
    // Hero Slider
    const heroSlider = document.getElementById("hero-slider")
    const sliderDots = document.getElementById("slider-dots")
    const prevSlideBtn = document.getElementById("prev-slide")
    const nextSlideBtn = document.getElementById("next-slide")
  
    // Slider data
    const slides = [
      {
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/coconut%20sugar-cDIicbmNo0JkDkKCg6jutW3HmP1zb2.png", // coconut sugar image
        number: "01",
        quality: "BEST QUALITY",
        title: "COCONUT SUGAR",
        description: "Premium organic coconut sugar exported worldwide",
      },
      {
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/powdered%20palm%20sugar-VeQaBQkghPGKzKqMz9xvxrSTE1rXvY.png", // powdered palm sugar image
        number: "02",
        quality: "PURE ORGANIC",
        title: "PALM SUGAR",
        description: "100% natural palm sugar with rich caramel flavor",
      },
      {
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/liquid%20sugar-jrTW0o41WZ1UKhKRTabvNvCohlWlPz.png", // liquid sugar image
        number: "03",
        quality: "SUSTAINABLE",
        title: "LIQUID SUGAR",
        description: "Eco-friendly production process for a better planet",
      },
    ]
  
    let currentSlide = 0
    let slideInterval
  
    // Create slides
    function createSlides() {
      slides.forEach((slide, index) => {
        // Create slide element
        const slideElement = document.createElement("div")
        slideElement.className = `slide ${index === 0 ? "active" : ""}`
        slideElement.style.backgroundImage = `url(${slide.image})`
  
        // Create slide overlay
        const overlay = document.createElement("div")
        overlay.className = "slide-overlay"
  
        // Create slide content
        const content = document.createElement("div")
        content.className = "slide-content"
        content.innerHTML = `
                  <div class="slide-label">
                      <span class="slide-number">${slide.number}</span>
                      <div class="slide-divider"></div>
                      <span class="slide-quality">${slide.quality}</span>
                  </div>
                  <h2 class="slide-title">${slide.title}</h2>
                  <p class="slide-description">${slide.description}</p>
                  <button class="btn primary-btn">
                      <span>Learn More</span>
                      <i class="fas fa-chevron-right"></i>
                  </button>
              `
  
        // Append elements
        slideElement.appendChild(overlay)
        slideElement.appendChild(content)
        heroSlider.appendChild(slideElement)
  
        // Create dot for this slide
        const dot = document.createElement("div")
        dot.className = `dot ${index === 0 ? "active" : ""}`
        dot.addEventListener("click", () => goToSlide(index))
        sliderDots.appendChild(dot)
      })
    }
  
    // Change slide
    function changeSlide(index) {
      // Update slides
      const slideElements = document.querySelectorAll(".slide")
      slideElements.forEach((slide, i) => {
        if (i === index) {
          slide.classList.add("active")
        } else {
          slide.classList.remove("active")
        }
      })
  
      // Update dots
      const dotElements = document.querySelectorAll(".dot")
      dotElements.forEach((dot, i) => {
        if (i === index) {
          dot.classList.add("active")
        } else {
          dot.classList.remove("active")
        }
      })
  
      // Update current slide index
      currentSlide = index
    }
  
    // Go to specific slide
    function goToSlide(index) {
      changeSlide(index)
      resetSlideInterval()
    }
  
    // Go to next slide
    function nextSlide() {
      const newIndex = (currentSlide + 1) % slides.length
      changeSlide(newIndex)
      resetSlideInterval()
    }
  
    // Go to previous slide
    function prevSlide() {
      const newIndex = (currentSlide - 1 + slides.length) % slides.length
      changeSlide(newIndex)
      resetSlideInterval()
    }
  
    // Reset slide interval
    function resetSlideInterval() {
      clearInterval(slideInterval)
      startSlideInterval()
    }
  
    // Start slide interval
    function startSlideInterval() {
      slideInterval = setInterval(nextSlide, 5000)
    }
  
    // Initialize slider
    function initSlider() {
      createSlides()
      startSlideInterval()
  
      // Add event listeners for navigation
      prevSlideBtn.addEventListener("click", prevSlide)
      nextSlideBtn.addEventListener("click", nextSlide)
    }
  
    // Initialize the slider
    initSlider()
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          // Account for fixed header height
          const headerHeight = document.querySelector(".header").offsetHeight
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight
  
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })
        }
      })
    })
  })
  