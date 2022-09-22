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

    querySelector(selector){
        return $dev(this.$el.querySelector(selector))
    }

    id(parse){
        if (parse){
            const parsed = this.id().split('-')

            return {
                col: +parsed[0],
                row: +parsed[1],
            }
        }

        return this.dataset.id
    }

    css(styles = {}){
        Object
            .keys(styles)
            .forEach(key => this.style[key] = styles[key])
    }

    text(content){
        if (typeof content !== 'undefined'){
            this.$el.textContent = content
            return this
        }

        if (this.$el.tagName.toLowerCase() === 'input') {
            return this.$el.value.trim()
        }

        return this.$el.textContent.trim()
    }

    get focus(){
        this.$el.focus()
        return this
    }

    value(data){
        if (data){
            this.$el.value = data
        }

        return this.$el.value
    }

    selectedIndex(){
        return this.$el.selectedIndex
    }

    get options(){
        if (this.$el.tagName.toLowerCase() === 'select'){
            return this.$el.options
        }

        return this
    }


    getStyles(styles = []){
        return styles.reduce((res, s) => {
            res[s] = this.$el.style[s]
            return res
        }, {})
    }

    attr(name, value){
        if (value){
            this.$el.setAttribute(name, value)
            return this
        }
        return this.$el.getAttribute(name)
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
