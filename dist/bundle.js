
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.47.0' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/js/Intro.svelte generated by Svelte v3.47.0 */

    const file$4 = "src/js/Intro.svelte";

    function create_fragment$4(ctx) {
    	let div2;
    	let div1;
    	let div0;
    	let span0;
    	let t1;
    	let span5;
    	let span2;
    	let span1;
    	let t4;
    	let br;
    	let t5;
    	let span4;
    	let span3;
    	let t7;
    	let a;
    	let t8;
    	let t9;
    	let t10;
    	let t11;
    	let t12;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			span0 = element("span");
    			span0.textContent = "👋";
    			t1 = space();
    			span5 = element("span");
    			span2 = element("span");
    			span1 = element("span");
    			span1.textContent = `Hello! I am ${name}`;
    			t4 = space();
    			br = element("br");
    			t5 = space();
    			span4 = element("span");
    			span3 = element("span");
    			span3.textContent = `${currentInterest}`;
    			t7 = text(",\n                    ");
    			a = element("a");
    			t8 = text(currentCompany);
    			t9 = text(",");
    			t10 = space();
    			t11 = text(/*currentCountry*/ ctx[0]);
    			t12 = text(".");
    			attr_dev(span0, "class", "hello-hand svelte-1330qt5");
    			add_location(span0, file$4, 11, 12, 348);
    			attr_dev(span1, "class", "hello-text svelte-1330qt5");
    			add_location(span1, file$4, 14, 20, 445);
    			add_location(span2, file$4, 13, 16, 418);
    			add_location(br, file$4, 16, 16, 536);
    			add_location(span3, file$4, 18, 20, 586);
    			attr_dev(a, "class", "cta");
    			attr_dev(a, "target", "_blank");
    			attr_dev(a, "href", currentCompanyLink);
    			add_location(a, file$4, 19, 20, 638);
    			add_location(span4, file$4, 17, 16, 559);
    			add_location(span5, file$4, 12, 12, 395);
    			attr_dev(div0, "class", "about-me svelte-1330qt5");
    			add_location(div0, file$4, 10, 8, 313);
    			attr_dev(div1, "class", "introduction svelte-1330qt5");
    			add_location(div1, file$4, 9, 4, 278);
    			attr_dev(div2, "class", "section");
    			add_location(div2, file$4, 8, 0, 252);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			append_dev(div0, span0);
    			append_dev(div0, t1);
    			append_dev(div0, span5);
    			append_dev(span5, span2);
    			append_dev(span2, span1);
    			append_dev(span5, t4);
    			append_dev(span5, br);
    			append_dev(span5, t5);
    			append_dev(span5, span4);
    			append_dev(span4, span3);
    			append_dev(span4, t7);
    			append_dev(span4, a);
    			append_dev(a, t8);
    			append_dev(span4, t9);
    			append_dev(span5, t10);
    			append_dev(span5, t11);
    			append_dev(span5, t12);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const name = "Jatin Tiwari";
    const currentInterest = "Software Engineer";
    const currentCompany = "Atlassian";
    const currentCompanyLink = "https://www.google.com/search?q=atlassian";

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Intro', slots, []);
    	let currentCountry = "India";
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Intro> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		name,
    		currentInterest,
    		currentCompany,
    		currentCompanyLink,
    		currentCountry
    	});

    	$$self.$inject_state = $$props => {
    		if ('currentCountry' in $$props) $$invalidate(0, currentCountry = $$props.currentCountry);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [currentCountry];
    }

    class Intro extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Intro",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src/js/Passion.svelte generated by Svelte v3.47.0 */

    const file$3 = "src/js/Passion.svelte";

    function create_fragment$3(ctx) {
    	let section2;
    	let section1;
    	let section0;
    	let span0;
    	let t1;
    	let span1;
    	let t3;
    	let span2;
    	let t5;
    	let span3;
    	let t7;
    	let p0;
    	let t8;
    	let span4;
    	let t10;
    	let t11;
    	let p1;
    	let t13;
    	let p2;

    	const block = {
    		c: function create() {
    			section2 = element("section");
    			section1 = element("section");
    			section0 = element("section");
    			span0 = element("span");
    			span0.textContent = "I am passionately curious!";
    			t1 = space();
    			span1 = element("span");
    			span1.textContent = "These days I am making lamps during my free time. I ❤️ dogs and like to train them 🦮.";
    			t3 = space();
    			span2 = element("span");
    			span2.textContent = "I have learnt cooking from youtube and now I sometimes feel like a Chef. I do cardio on Ted talks.";
    			t5 = space();
    			span3 = element("span");
    			span3.textContent = "I sometimes play video games over weekend.";
    			t7 = space();
    			p0 = element("p");
    			t8 = text("I am also avidly looking out for building projects on ");
    			span4 = element("span");
    			span4.textContent = "Raspberry Pi";
    			t10 = text(".");
    			t11 = space();
    			p1 = element("p");
    			p1.textContent = "I like reading tech books and articles. I aspire to write a blog to simplify the technology.";
    			t13 = space();
    			p2 = element("p");
    			p2.textContent = "I will be happy to connect for new opportunities or consultation✌🏽";
    			attr_dev(span0, "class", "tomato text-italic");
    			add_location(span0, file$3, 3, 12, 106);
    			add_location(span1, file$3, 4, 12, 185);
    			add_location(span2, file$3, 5, 12, 297);
    			add_location(span3, file$3, 6, 12, 421);
    			add_location(section0, file$3, 2, 8, 84);
    			attr_dev(span4, "class", "highlight");
    			add_location(span4, file$3, 8, 65, 561);
    			add_location(p0, file$3, 8, 8, 504);
    			add_location(p1, file$3, 9, 8, 618);
    			attr_dev(p2, "class", "text-center");
    			add_location(p2, file$3, 13, 8, 901);
    			attr_dev(section1, "class", "container");
    			add_location(section1, file$3, 1, 4, 48);
    			attr_dev(section2, "class", "section passion-container");
    			add_location(section2, file$3, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section2, anchor);
    			append_dev(section2, section1);
    			append_dev(section1, section0);
    			append_dev(section0, span0);
    			append_dev(section0, t1);
    			append_dev(section0, span1);
    			append_dev(section0, t3);
    			append_dev(section0, span2);
    			append_dev(section0, t5);
    			append_dev(section0, span3);
    			append_dev(section1, t7);
    			append_dev(section1, p0);
    			append_dev(p0, t8);
    			append_dev(p0, span4);
    			append_dev(p0, t10);
    			append_dev(section1, t11);
    			append_dev(section1, p1);
    			append_dev(section1, t13);
    			append_dev(section1, p2);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Passion', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Passion> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Passion extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Passion",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src/js/Skills.svelte generated by Svelte v3.47.0 */

    const file$2 = "src/js/Skills.svelte";

    function create_fragment$2(ctx) {
    	let section1;
    	let section0;
    	let p0;
    	let t3;
    	let p1;
    	let t5;
    	let p2;
    	let t6;
    	let span0;
    	let t8;
    	let span1;
    	let t10;
    	let a0;
    	let t12;
    	let span2;
    	let t14;
    	let span3;
    	let t16;
    	let t17;
    	let p3;
    	let t18;
    	let span4;
    	let t20;
    	let span5;
    	let t22;
    	let a1;
    	let t24;
    	let t25;
    	let p4;
    	let t26;
    	let span6;
    	let t28;
    	let t29;
    	let p5;
    	let t30;
    	let span7;
    	let t32;
    	let span8;
    	let t34;

    	const block = {
    		c: function create() {
    			section1 = element("section");
    			section0 = element("section");
    			p0 = element("p");
    			p0.textContent = `I have ${/*yearOfExperience*/ ctx[0]}+ years of experience in frontend development. For approximately 5 years I have worked with small to very large scale e-commerce companies.`;
    			t3 = space();
    			p1 = element("p");
    			p1.textContent = "I have advance knowledge in Web and App development.";
    			t5 = space();
    			p2 = element("p");
    			t6 = text("I have expertise in ");
    			span0 = element("span");
    			span0.textContent = "Javascript";
    			t8 = text(". I have started working with\n            ");
    			span1 = element("span");
    			span1.textContent = "React JS";
    			t10 = text(" during my days with ");
    			a0 = element("a");
    			a0.textContent = "Furlenco";
    			t12 = text(" and instantly liked it. I also have prior experience with ");
    			span2 = element("span");
    			span2.textContent = "Angular JS";
    			t14 = text(" and ");
    			span3 = element("span");
    			span3.textContent = "Backbone JS";
    			t16 = text(".");
    			t17 = space();
    			p3 = element("p");
    			t18 = text("I am enthusiastic about ");
    			span4 = element("span");
    			span4.textContent = "Puppeteer JS";
    			t20 = text(" and can very quickly build a scalable API in\n            ");
    			span5 = element("span");
    			span5.textContent = "NodeJS";
    			t22 = text(". While working with\n            ");
    			a1 = element("a");
    			a1.textContent = "Flipkart";
    			t24 = text(", I had created a Visual Regression tool which\n            was able to take screenshots of all the app workflows and then assert baseline with checkpoint images. This tool solved problems involved with manual testing.");
    			t25 = space();
    			p4 = element("p");
    			t26 = text("I ❤️ ");
    			span6 = element("span");
    			span6.textContent = "building apps from scratch";
    			t28 = text(" and then scale them to serve millions of cusomters. I also believe\n            that it takes time to build such apps and use of technology is as per need basis.");
    			t29 = space();
    			p5 = element("p");
    			t30 = text("I have helped a few friends to kick off their startup dream with native apps in ");
    			span7 = element("span");
    			span7.textContent = "Flutter";
    			t32 = text("\n            and ");
    			span8 = element("span");
    			span8.textContent = "React native";
    			t34 = text(".");
    			add_location(p0, file$2, 9, 8, 349);
    			add_location(p1, file$2, 12, 8, 551);
    			attr_dev(span0, "class", "text-bold");
    			add_location(span0, file$2, 14, 32, 655);
    			attr_dev(span1, "class", "highlight");
    			add_location(span1, file$2, 15, 12, 738);
    			attr_dev(a0, "class", "cta");
    			attr_dev(a0, "href", "https://en.wikipedia.org/wiki/Furlenco");
    			attr_dev(a0, "target", "_blank");
    			add_location(a0, file$2, 15, 72, 798);
    			attr_dev(span2, "class", "highlight");
    			add_location(span2, file$2, 15, 220, 946);
    			attr_dev(span3, "class", "highlight");
    			add_location(span3, file$2, 15, 266, 992);
    			add_location(p2, file$2, 13, 8, 619);
    			attr_dev(span4, "class", "highlight");
    			add_location(span4, file$2, 18, 36, 1097);
    			attr_dev(span5, "class", "highlight");
    			add_location(span5, file$2, 19, 12, 1198);
    			attr_dev(a1, "class", "cta");
    			attr_dev(a1, "href", "https://en.wikipedia.org/wiki/Flipkart");
    			attr_dev(a1, "target", "_blank");
    			add_location(a1, file$2, 20, 12, 1268);
    			add_location(p3, file$2, 17, 8, 1057);
    			attr_dev(span6, "class", "text-italic");
    			add_location(span6, file$2, 24, 17, 1617);
    			add_location(p4, file$2, 23, 8, 1596);
    			attr_dev(span7, "class", "highlight");
    			add_location(span7, file$2, 28, 92, 1955);
    			attr_dev(span8, "class", "highlight");
    			add_location(span8, file$2, 29, 16, 2010);
    			add_location(p5, file$2, 27, 8, 1859);
    			attr_dev(section0, "class", "container");
    			add_location(section0, file$2, 8, 4, 313);
    			attr_dev(section1, "class", "section");
    			add_location(section1, file$2, 7, 0, 283);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section1, anchor);
    			append_dev(section1, section0);
    			append_dev(section0, p0);
    			append_dev(section0, t3);
    			append_dev(section0, p1);
    			append_dev(section0, t5);
    			append_dev(section0, p2);
    			append_dev(p2, t6);
    			append_dev(p2, span0);
    			append_dev(p2, t8);
    			append_dev(p2, span1);
    			append_dev(p2, t10);
    			append_dev(p2, a0);
    			append_dev(p2, t12);
    			append_dev(p2, span2);
    			append_dev(p2, t14);
    			append_dev(p2, span3);
    			append_dev(p2, t16);
    			append_dev(section0, t17);
    			append_dev(section0, p3);
    			append_dev(p3, t18);
    			append_dev(p3, span4);
    			append_dev(p3, t20);
    			append_dev(p3, span5);
    			append_dev(p3, t22);
    			append_dev(p3, a1);
    			append_dev(p3, t24);
    			append_dev(section0, t25);
    			append_dev(section0, p4);
    			append_dev(p4, t26);
    			append_dev(p4, span6);
    			append_dev(p4, t28);
    			append_dev(section0, t29);
    			append_dev(section0, p5);
    			append_dev(p5, t30);
    			append_dev(p5, span7);
    			append_dev(p5, t32);
    			append_dev(p5, span8);
    			append_dev(p5, t34);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Skills', slots, []);
    	const currentDate = new Date();
    	const dateIStartedWorking = new Date("July 21, 2014");

    	const yearOfExperience = currentDate.getFullYear() - dateIStartedWorking.getFullYear() - (currentDate.getMonth() > dateIStartedWorking.getMonth()
    	? 0
    	: 1);

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Skills> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		currentDate,
    		dateIStartedWorking,
    		yearOfExperience
    	});

    	return [yearOfExperience];
    }

    class Skills extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Skills",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/js/Contact.svelte generated by Svelte v3.47.0 */

    const { Object: Object_1 } = globals;
    const file$1 = "src/js/Contact.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	return child_ctx;
    }

    // (13:8) {#each socialMediaKeys as key}
    function create_each_block(ctx) {
    	let span;
    	let a;
    	let t0_value = /*key*/ ctx[2] + "";
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			span = element("span");
    			a = element("a");
    			t0 = text(t0_value);
    			t1 = space();
    			attr_dev(a, "class", "cta");
    			attr_dev(a, "target", "_blank");
    			attr_dev(a, "href", /*socialMedia*/ ctx[0][/*key*/ ctx[2]]);
    			add_location(a, file$1, 14, 16, 489);
    			add_location(span, file$1, 13, 12, 466);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, a);
    			append_dev(a, t0);
    			append_dev(span, t1);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(13:8) {#each socialMediaKeys as key}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let div1;
    	let div0;
    	let each_value = /*socialMediaKeys*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div0, "class", "container contacts bg-blue svelte-sktqyu");
    			add_location(div0, file$1, 11, 4, 374);
    			attr_dev(div1, "class", "section sticky-bottom svelte-sktqyu");
    			add_location(div1, file$1, 10, 0, 334);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*socialMedia, socialMediaKeys*/ 3) {
    				each_value = /*socialMediaKeys*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div0, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Contact', slots, []);

    	const socialMedia = {
    		LINKEDIN: "https://www.linkedin.com/in/jatin-tiwari-3783aa50",
    		GITHUB: "https://www.github.com/jatintiwari",
    		EMAIL: "mailto:mail@jatintiwari.com",
    		RESUME: "https://www.jatintiwari.com/knowmore"
    	};

    	const socialMediaKeys = Object.keys(socialMedia);
    	const writable_props = [];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Contact> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ socialMedia, socialMediaKeys });
    	return [socialMedia, socialMediaKeys];
    }

    class Contact extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Contact",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.47.0 */
    const file = "src/App.svelte";

    function create_fragment(ctx) {
    	let main;
    	let intro;
    	let t0;
    	let skills;
    	let t1;
    	let passion;
    	let t2;
    	let contact;
    	let current;
    	intro = new Intro({ $$inline: true });
    	skills = new Skills({ $$inline: true });
    	passion = new Passion({ $$inline: true });
    	contact = new Contact({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(intro.$$.fragment);
    			t0 = space();
    			create_component(skills.$$.fragment);
    			t1 = space();
    			create_component(passion.$$.fragment);
    			t2 = space();
    			create_component(contact.$$.fragment);
    			attr_dev(main, "id", "app");
    			attr_dev(main, "class", "svelte-blhg4c");
    			add_location(main, file, 7, 0, 202);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(intro, main, null);
    			append_dev(main, t0);
    			mount_component(skills, main, null);
    			append_dev(main, t1);
    			mount_component(passion, main, null);
    			append_dev(main, t2);
    			mount_component(contact, main, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro$1(local) {
    			if (current) return;
    			transition_in(intro.$$.fragment, local);
    			transition_in(skills.$$.fragment, local);
    			transition_in(passion.$$.fragment, local);
    			transition_in(contact.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(intro.$$.fragment, local);
    			transition_out(skills.$$.fragment, local);
    			transition_out(passion.$$.fragment, local);
    			transition_out(contact.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(intro);
    			destroy_component(skills);
    			destroy_component(passion);
    			destroy_component(contact);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Intro, Passion, Skills, Contact });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const appElem = document.getElementById('jatintiwari');
    const app = new App({
    	target: appElem,
    	props: {}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
