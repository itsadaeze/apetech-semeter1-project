

const filterButtons = document.querySelectorAll('.merchandise-filter-btn');
const cardsContainer = document.querySelector('.merchandise-cards');

// Apply flex direction row to the cards container
cardsContainer.style.display = 'flex';
cardsContainer.style.flexWrap = 'wrap';
cardsContainer.style.gap = '20px';

fetch('json/merchandise.json')
  .then(response => response.json())
  .then(data => {
    // Generate cards from JSON data
    data.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('merchandise-card');
      card.dataset.category = item.category;

      // Apply inline styles to the card
      card.style.display = 'flex';
      card.style.flexDirection = 'column';
      card.style.margin = '10px';
      card.style.width = '250px'; // Default width

      const img = document.createElement('img');
      img.src = item.image;
      img.alt = item.title;
      img.style.width = '100%';
      img.style.height = '200px';
      img.style.objectFit = 'cover';

      const title = document.createElement('p');
      title.textContent = item.title;

      card.appendChild(img);
      card.appendChild(title);
      cardsContainer.appendChild(card);
    });

    // Filter functionality
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const merchandiseCards = document.querySelectorAll('.merchandise-card');
        merchandiseCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    // Responsive design
    function handleResize() {
      const width = window.innerWidth;
      if (width < 768) {
        // Adjust layout for mobile view
        cardsContainer.style.flexDirection = 'row';
        cardsContainer.style.overflowX = 'auto'; 
        cardsContainer.style.flexWrap = 'nowrap'; 
        cardsContainer.style.alignItems = 'flex-start'; 
        cardsContainer.style.width = 'auto';
     

        const cardContainers = document.querySelectorAll('.merchandise-card');
        cardContainers.forEach(card => {
          card.style.width = '80%'; 
          card.style.minWidth = '200px'; 
          card.style.margin = '0 10px'; 
          card.style.overflowX = 'visible'; 
        });
      } else {
        // Adjust layout for desktop view
        cardsContainer.style.flexDirection = 'row';
        cardsContainer.style.overflowX = 'visible';
        cardsContainer.style.flexWrap = 'wrap';
        cardsContainer.style.alignItems = 'stretch';
        cardsContainer.style.width = '100%';

        const cardContainers = document.querySelectorAll('.merchandise-card');
        cardContainers.forEach(card => {
          card.style.width = '250px';
          card.style.margin = '10px';
        });
      }
    }

    // Initial resize and event listener
    handleResize();
    window.addEventListener('resize', handleResize);
  })
  .catch(error => console.error('Error fetching merchandise data:', error));