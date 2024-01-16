//      На сторінці post-details.html:
// 7. Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8. Нижче інформації про пост, вивести всі коментарі поточного поста (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)
//
//      Стилизація проєкта:
//  index.html - всі блоки з user - по 2 в рядок. кнопки/посилання розташувати під інформацією про user.
//  user-details.html - блок з інфою про user зверху сторінки. Кнопка нижче, на 90% ширини сторінки, по центру.
//  блоки з короткою інфою про post - в ряд по 5 .
//  post-details.html - блок з інфою про пост зверху. Коментарі - по 4 в ряд.
//  Всі елементи котрі характеризують users, posts, comments візуалізувати, так, щоб було видно що це блоки (дати фон. марджини і тд).

const id = new URLSearchParams(location.search).get('id');
const wrapper = document.getElementsByClassName('wrapper')[0];

fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((response) => response.json())
    .then((post) => {
        const postInfo = document.createElement('div');
        const ul = document.createElement('ul');

        ul.classList.add('info', 'post-info');

        postInfo.appendChild(ul);
        wrapper.appendChild(postInfo);

        for (const key in post) {
            const li = document.createElement('li');
            li.innerHTML = `<b>${key}:</b> ${post[key]}`;
            ul.appendChild(li);
        }

        fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
            .then((response) => response.json())
            .then((comments) => {
                const btnContainer = document.createElement('div');
                const commentsContainer = document.createElement('div');
                const showBtn = document.createElement('button');
                const hideBtn = document.createElement('button');

                btnContainer.append(showBtn, hideBtn);
                wrapper.append(btnContainer, commentsContainer);

                btnContainer.classList.add('button');

                showBtn.innerText = 'Show comments';
                hideBtn.innerText = 'Hide comments';
                hideBtn.style.display = 'none';

                showBtn.onclick = () => {
                    comments.forEach((comment) => {
                        const block = document.createElement('div');
                        const name = document.createElement('h3');
                        const email = document.createElement('p');
                        const body = document.createElement('p');

                        block.classList.add('block', 'comment');
                        commentsContainer.classList.add('blocks', 'comments');

                        commentsContainer.appendChild(block);
                        block.append(name, email, body);

                        name.innerHTML = `<b>Name:</b> ${comment.name}`;
                        email.innerHTML = `<b>Email:</b> ${comment.email}`;
                        body.innerHTML = `<b>Body:</b> ${comment.body}`;
                    });

                    showBtn.style.display = 'none';
                    hideBtn.style.display = 'block';
                };
                hideBtn.onclick = () => {
                    commentsContainer.innerHTML = '';
                    hideBtn.style.display = 'none';
                    showBtn.style.display = 'block';
                };
            });
    });


