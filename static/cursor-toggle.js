(function () {
    /* По умолчанию системный курсор. В localStorage '1' = пользователь включил узел. */
    var KEY = "vizitkaCustomCursor";
    var root = document.documentElement;
    var easter = document.getElementById("easter-cursor-toggle");
    var follower = document.getElementById("custom-cursor-follower");
    var raf = 0;
    var lastX = 0;
    var lastY = 0;

    function storageGet() {
        try {
            return localStorage.getItem(KEY);
        } catch (e) {
            return null;
        }
    }

    function storageSet(v) {
        try {
            if (v === null) localStorage.removeItem(KEY);
            else localStorage.setItem(KEY, v);
        } catch (e) {}
    }

    function isNoCustom() {
        return root.classList.contains("no-custom-cursor");
    }

    function setNoCustom(on) {
        if (on) {
            root.classList.add("no-custom-cursor");
            storageSet(null);
        } else {
            root.classList.remove("no-custom-cursor");
            storageSet("1");
        }
        if (follower) {
            if (on) {
                follower.classList.remove("is-active");
            } else {
                follower.style.left = lastX + "px";
                follower.style.top = lastY + "px";
                follower.classList.add("is-active");
            }
        }
    }

    function toggle(ev) {
        if (ev) {
            ev.preventDefault();
            ev.stopPropagation();
        }
        setNoCustom(!isNoCustom());
    }

    function onPointerMove(e) {
        lastX = e.clientX;
        lastY = e.clientY;
        if (isNoCustom() || !follower) return;
        if (raf) return;
        raf = requestAnimationFrame(function () {
            raf = 0;
            follower.style.left = lastX + "px";
            follower.style.top = lastY + "px";
            follower.classList.add("is-active");
        });
    }

    if (storageGet() === "1") {
        root.classList.remove("no-custom-cursor");
    }

    document.addEventListener("pointermove", onPointerMove, { passive: true });

    if (easter) {
        easter.addEventListener("click", function (ev) {
            ev.preventDefault();
            toggle(ev);
        });
    }
})();
