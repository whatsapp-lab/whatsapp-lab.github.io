/*
**
** by @adrielALVES
** 2020/10
*/

/**
 * att -- flag PT/EN
 */

console.log('\n @@-- aDR --@@ \n $$$$$$$$$$$');

// DOM

const DOM = {
    phone: document.querySelector('#phone'),
    name: document.querySelector('#name'),
    mss: document.querySelector('#mssInterativa'),
    text: document.querySelector('#textoSimples'),
    link: document.querySelector('#crtLink'),
    prev: document.querySelector('#preview'),
    btnCopy: document.querySelector('#btnCopy'),
    btnEdit: document.querySelector('#btnEdit'),
    linkContainer: document.querySelector('#linkContainer')
}

const phone = document.querySelector('#phone');
const name = document.querySelector('#name');
const mss = document.querySelector('#mssInterativa');
const text = document.querySelector('#textoSimples');
const link = document.querySelector('#crtLink');
const prev = document.querySelector('#preview');
const btnCopy = document.querySelector('#btnCopy');
const btnEdit = document.querySelector('#btnEdit');


// FUNCTIONS
// greating of the day
const greating = () => {
    const now = new Date();
    hours = now.getHours();
    let great;

    if (hours >= 0 && hours < 12) {
        great = 'bom dia';
    } else if (hours >= 12 && hours < 18) {
        great = 'boa tarde';
    } else if (hours >= 18 && hours < 24) {
        great = 'boa noite';
    }
    return great;
}

// redirit interative function
// url parameter
const urlP = () => {

	console.log('into url');
    // ?name=&phone=
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if(urlParams.has('p')) {
        let phoneUrl = urlParams.get('p');
        if(urlParams.has('text')){
            window.location.replace(`https://wa.me/${phoneUrl}?text=Oi,%20${greating}`);
        } else {
        	let nameUrl = urlParams.get('text');
            window.location.replace(`https://wa.me/${phoneUrl}?text=Oi%20${nameUrl},%20${greating}`);
        }
    } else {
    	console.log('somethin went wrong --');
    }
}

urlP();

// form--visibility
const formVisibility = (stat) => {
    if(stat){
        console.log('we are in');
        DOM.phone.removeAttribute('disabled');
        DOM.name.removeAttribute('disabled');
        DOM.text.removeAttribute('disabled');
        DOM.mss.removeAttribute('disabled');
        DOM.link.removeAttribute('disabled');
        DOM.btnEdit.setAttribute('disabled', 'disabled');
        DOM.linkContainer.innerHTML = ``;    
    } else {
        DOM.phone.setAttribute('disabled', 'disabled');
        DOM.name.setAttribute('disabled', 'disabled');
        DOM.text.setAttribute('disabled', 'disabled');
        DOM.mss.setAttribute('disabled', 'disabled');
        DOM.link.setAttribute('disabled', 'disabled');
        DOM.btnEdit.removeAttribute('disabled');
    }
}

// form-input phone--validation 
const validate = (evt) => {
    var theEvent = evt || window.event;

    // Handle paste
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
        // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }

    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}



// replace--black-space
const replaceSpace = (txt) => {
    return txt.replace(/\s/g, "%20");
}

// copy--link
const copyText = () => {
    let str = document.querySelector('#linkGerado').innerText;
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    
    
    let html = `<span class="badge badge-pill badge-success" id="labCopiado">Copiado</span>`;

    try {
        document.querySelector('#labCopiado').parentNode.removeChild(document.querySelector('#labCopiado'));
    } catch (error) {
        console.log('copy --addLabel');
    }
    
    document.querySelector('#linkSection').insertAdjacentHTML('afterbegin', html);
}

// create link association
const crtLink = () => {
    // check phone input
    if (phone.value) {
        // check se menssagem simples
        if (text.value) {

            let textReplaced = replaceSpace(text.value);

            let html = `<div class="col-12">
                <h5>Link</h5>
                <div class="my-a border" id="linkSection">
                
                    <i class="fas fa-link"></i>
                    <a href="https://wa.me/${phone.value}?text=${textReplaced}"  target="_blank" class="my-a" style="display:inline-block !important">
                        <h5 id="linkGerado">https://wa.me/${phone.value}?text=${textReplaced}</h5>
                    </a>
                </div>
                <button onclick="copyText()" type="button" class="btn btn-outline-primary btn-sm my-2" id="btnCopy" ><i class="far fa-copy"></i>
                    COPIAR</button>
                <button type="button" class="btn btn-outline-primary btn-sm my-2"><i class="far fa-user-circle"></i>
                    ADICIONAR A UMA PAGINA DE CONTATO</button>
            </div>`;


            document.querySelector('#linkContainer').innerHTML = ``;
            document.querySelector('#linkContainer').insertAdjacentHTML('beforeend', html);

        } else {
            let textInt;
            let host;
            // saber qual mensagem foi selecionada

            let valueSelected = selectedMenssage();

            switch (valueSelected) {
                case 1:
                    // especial

                    if (DOM.name.value) {
                        textInt = DOM.name.value;
                    } else {
                        textInt = ``;
                    }
                    host = 'whatsapp-lab.github.io/?p=';
                    break;
                case 2:
                    if (DOM.name.value) {
                        textInt = replaceSpace(`${name.value} gostaria de falar com você`);
                    } else {
                        textInt = `Gostaria%20de%20falar%20com%20você`;
                    }
                    host = 'wa.me/';
                    break;
                case 3:
                    if(DOM.name.value){
                        textInt = replaceSpace(`${name.value} preciso falar com você`);
                    } else {
                        textInt = `Preciso%20falar%20com%20você`;
                    }
                    host = 'wa.me/';
                    break;
            }

                
            let html = `<div class="col-12">
            <h5>Link</h5>
            <div class="my-a border" id="linkSection">
            
                <i class="fas fa-link"></i>
                <a href="https://${host}${phone.value}?text=${textInt}"  target="_blank" class="my-a" style="display:inline-block !important">
                    <h5 id="linkGerado">https://${host}${phone.value}?text=${textInt}</h5>
                </a>
            </div>
            <button onclick="copyText()" type="button" class="btn btn-outline-primary btn-sm my-2" id="btnCopy" ><i class="far fa-copy"></i>
                COPIAR</button>
            <button type="button" class="btn btn-outline-primary btn-sm my-2"><i class="far fa-user-circle"></i>
                ADICIONAR A UMA PAGINA DE CONTATO</button>
        </div>`;


        document.querySelector('#linkContainer').innerHTML = ``;
        document.querySelector('#linkContainer').insertAdjacentHTML('beforeend', html);

            

            
        }

        formVisibility(false);

    } else {
        alert('VOCÊ PRECISA ADICIONAR SEU NUMERO DO WHATSAPP. LEMBRE DE SEGUIR O PADRA0 55119-------');
    }
} 


/**
 * EVENTLISTENERS
 */

// edit-button
btnEdit.addEventListener('click', () => {
    formVisibility(true);
});

// phone--input 
phone.addEventListener('keypress', validate);

// update-preview 
name.addEventListener('input', () => {
    updPreview(name.value);
});

mss.addEventListener('change', () => {
    if (!name.value) {
        document.querySelector('#alert').innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">Você pode adicionar seu <strong>nome</strong> à mensagem interativa
  <button id="alertClose" type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="closeAlert()">
    <span aria-hidden="true">&times;</span>
  </button>
</div>`;
        updPreview(name.value);
    } else {
        updPreview(name.value);
    }

    // clean text-simple input
    DOM.text.value = ``;
    
    //update preview

});


// close alert function
const closeAlert = ()=> { 
    document.querySelector('#alert').innerHTML = ` `;
};

link.addEventListener('click', crtLink);

text.addEventListener('input', () => {
    updPreview(text.value);
});

text.addEventListener('input', () => {
    name.value = ``;
    mss.value  = 'Selecione...';
    //prev.placeholder = ``;
});

const updPreview = (ent) => {

    console.log('ent updPreview');
    let valueSelected = selectedMenssage();
    //let name = document.querySelector('#name').value;
    // && isNaN(name.value) 
    if (!isNaN(valueSelected) && text.value == false) {
        switch (valueSelected) {
            case 1:
                prev.placeholder = `Oi ${name.value}, ${greating()}`;
                break;
            case 2:
                prev.placeholder = `${name.value} gostaria de falar com você`;
                break;
            case 3:
                prev.placeholder = `${name.value} preciso falar com você`;
                break;
        }
    } else if (isNaN(valueSelected) && name.value && text.value == false) {
        prev.placeholder = ent;
    } else {
       prev.placeholder = text.value;
    }
}

const selectedMenssage = () => {
    let value = mss[mss.selectedIndex].value;
    return parseInt(value);
}





