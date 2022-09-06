class Dom{
    constructor(selector){
        this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector
    }

    html(html){
        if (typeof html === 'string'){
            this.$el.innerHTML = html
            return this
        }

        return this.$el.outerHTML.trim()
    }

    clear(){
        this.html('')
        return this
    }

    on(eventType, callback){
        this.$el.addEventListener(eventType, callback)
    }

    off(eventType, callback){
        this.$el.removeEventListener(eventType, callback)
    }

    append(node){
        if (node instanceof Dom){
            node = node.$el
        }

        if (Element.prototype.append){
            this.$el.append(node)
        } else {
            this.$el.appendChild(node)
        }

        return this
    }

    closest(selector){
        return $dev(this.$el.closest(selector))
    }

    getCoords(){
        return this.$el.getBoundingClientRect()
    }

    get style(){
        return this.$el.style
    }

    get dataset(){
        return this.$el.dataset
    }

    addClass(className){
        this.$el.classList.add(className)
        return this
    }

    removeClass(className){
        this.$el.classList.remove(className)
        return this
    }

    querySelectorAll(selector){
        return this.$el.querySelectorAll(selector)
    }

    css(styles = {}){
        Object
            .keys(styles)
            .forEach(key => this.style[key] = styles[key])
    }
}

export function $dev(selector){
    return new Dom(selector)
}

$dev.create = (tagname, classes = '') => {
    const el = document.createElement(tagname)
    if (classes){
        el.classList.add(classes)
    }

    return $dev(el)
}
