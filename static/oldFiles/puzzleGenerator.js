

var PuzzleScriptExperiment = function(puzzleTimeLimit, levelSourceCode) {

	var trialData = [];

	var finishPuzzlePage = function() {
        psiTurk.recordTrialData({
                    "phase": "TEST",
                    "stage": currentPage,
                    "trial_data": trial_data
                });
		psiTurk.recordTrialData({"phase": "TEST",
                                 "event_log": trialData});
		document.removeEventListener("keydown", onKeyDown);
		document.removeEventListener("keyup", onKeyUp);
		document.removeEventListener("mousedown", onMouseDown);
		document.removeEventListener("mouseup", onMouseUp);
	};

	psiTurk.showPage('stage.html');









    function doSetupTitleScreenLevelContinue() {
        try {
            if (window.localStorage && void 0 !== localStorage[document.URL]) {
                if (void 0 !== localStorage[document.URL + "_checkpoint"]) {
                    var e = localStorage[document.URL + "_checkpoint"];
                    curlevelTarget = JSON.parse(e);
                    var t = [];
                    for (var n in Object.keys(curlevelTarget.dat)) t[n] = curlevelTarget.dat[n];
                    curlevelTarget.dat = new Int32Array(t)
                }
                curlevel = localStorage[document.URL]
            }
        } catch (e) {}
    }
    var unitTesting = !1,
        curlevel = 0,
        curlevelTarget = null,
        hasUsedCheckpoint = !1,
        levelEditorOpened = !1,
        muted = 0;
    // doSetupTitleScreenLevelContinue();
    var verbose_logging = !1,
        throttle_movement = !1,
        cache_console_messages = !1,
        quittingTitleScreen = !1,
        quittingMessageScreen = !1,
        deltatime = 17,
        timer = 0,
        repeatinterval = 150,
        autotick = 0,
        autotickinterval = 0,
        winning = !1,
        againing = !1,
        againinterval = 150,
        norepeat_action = !1,
        oldflickscreendat = [],
        keybuffer = [],
        restarting = !1,
        messageselected = !1,
        textImages = {},
        initLevel = {
            width: 5,
            height: 5,
            layerCount: 2,
            dat: [1, 3, 3, 1, 1, 2, 2, 3, 3, 1, 2, 1, 2, 2, 3, 3, 1, 1, 2, 2, 3, 2, 1, 3, 2, 1, 3, 2, 1, 3, 1, 3, 3, 1, 1, 2, 2, 3, 3, 1, 2, 1, 2, 2, 3, 3, 1, 1, 2, 2],
            movementMask: [1, 3, 3, 1, 1, 2, 2, 3, 3, 1, 2, 1, 2, 2, 3, 3, 1, 1, 2, 2, 3, 2, 1, 3, 2, 1, 3, 2, 1, 3, 1, 3, 3, 1, 1, 2, 2, 3, 3, 1, 2, 1, 2, 2, 3, 3, 1, 1, 2, 2],
            rigidGroupIndexMask: [],
            rigidMovementAppliedMask: [],
            bannedGroup: [],
            colCellContents: [],
            rowCellContents: []
        },
        level = initLevel;
    
    function stripTags(n) {
        var e = document.createElement("div");
        e.innerHTML = n;
        var r = e.textContent || e.innerText || "";
        return r
    }

        function consolePrint(n, e) {}

        function consolePrintFromRule(n, e, r) {}

        function consoleCacheDump(n) {}

        function consoleError(n, e) {
            var r = document.getElementById("errormessage");
            n = stripTags(n), r.innerHTML += n + "<br>"
        }

        function logErrorNoLine(n) {
            var e = document.getElementById("errormessage");
            n = stripTags(n), e.innerHTML += n + "<br>"
        }

        function logBetaMessage(n) {
            var e = document.getElementById("errormessage");
            n = stripTags(n), e.innerHTML += n + "<br>"
        }

        function clearInputHistory() {}

        function pushInput(n) {}
        var canSetHTMLColors = !0,
            canDump = !1,
            canOpenEditor = !1,
            canYoutube = !0,
            IDE = !1;
    
        var font = {
            a: [
                [0, 0, 0, 0, 0],
                [0, 1, 1, 1, 0],
                [1, 0, 0, 1, 0],
                [1, 0, 0, 1, 0],
                [0, 1, 1, 1, 0]
            ],
            b: [
                [1, 0, 0, 0, 0],
                [1, 0, 0, 0, 0],
                [1, 1, 1, 0, 0],
                [1, 0, 0, 1, 0],
                [0, 1, 1, 0, 0]
            ],
            c: [
                [0, 0, 0, 0, 0],
                [0, 1, 1, 1, 0],
                [1, 0, 0, 0, 0],
                [1, 0, 0, 0, 0],
                [0, 1, 1, 1, 0]
            ],
            d: [
                [0, 0, 0, 1, 0],
                [0, 0, 0, 1, 0],
                [0, 1, 1, 1, 0],
                [1, 0, 0, 1, 0],
                [0, 1, 1, 0, 0]
            ],
            e: [
                [0, 1, 1, 0, 0],
                [1, 0, 0, 1, 0],
                [1, 1, 1, 0, 0],
                [1, 0, 0, 0, 0],
                [0, 1, 1, 0, 0]
            ],
            f: [
                [0, 0, 0, 0, 0],
                [0, 0, 1, 1, 0],
                [0, 1, 0, 0, 0],
                [1, 1, 1, 0, 0],
                [0, 1, 0, 0, 0]
            ],
            g: [
                [0, 1, 1, 0, 0],
                [1, 0, 0, 1, 0],
                [0, 1, 1, 1, 0],
                [0, 0, 0, 1, 0],
                [0, 1, 1, 0, 0]
            ],
            h: [
                [1, 0, 0, 0, 0],
                [1, 0, 0, 0, 0],
                [1, 1, 1, 0, 0],
                [1, 0, 0, 1, 0],
                [1, 0, 0, 1, 0]
            ],
            i: [
                [0, 0, 1, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 1, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 1, 1, 1, 0]
            ],
            j: [
                [0, 0, 1, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0],
                [1, 0, 1, 0, 0],
                [0, 1, 0, 0, 0]
            ],
            k: [
                [1, 0, 0, 0, 0],
                [1, 0, 0, 1, 0],
                [1, 1, 1, 0, 0],
                [1, 0, 0, 1, 0],
                [1, 0, 0, 1, 0]
            ],
            l: [
                [1, 0, 0, 0, 0],
                [1, 0, 0, 0, 0],
                [1, 0, 0, 0, 0],
                [1, 0, 0, 1, 0],
                [0, 1, 1, 0, 0]
            ],
            m: [
                [0, 0, 0, 0, 0],
                [0, 1, 0, 1, 0],
                [1, 0, 1, 0, 1],
                [1, 0, 1, 0, 1],
                [1, 0, 1, 0, 1]
            ],
            n: [
                [0, 0, 0, 0, 0],
                [0, 1, 1, 0, 0],
                [1, 0, 0, 1, 0],
                [1, 0, 0, 1, 0],
                [1, 0, 0, 1, 0]
            ],
            o: [
                [0, 0, 0, 0, 0],
                [0, 1, 1, 0, 0],
                [1, 0, 0, 1, 0],
                [1, 0, 0, 1, 0],
                [0, 1, 1, 0, 0]
            ],
            p: [
                [0, 0, 0, 0, 0],
                [0, 1, 1, 0, 0],
                [1, 0, 0, 1, 0],
                [1, 1, 1, 0, 0],
                [1, 0, 0, 0, 0]
            ],
            q: [
                [0, 0, 0, 0, 0],
                [0, 1, 1, 0, 0],
                [1, 0, 0, 1, 0],
                [0, 1, 1, 1, 0],
                [0, 0, 0, 1, 0]
            ],
            r: [
                [0, 0, 0, 0, 0],
                [0, 1, 1, 1, 0],
                [1, 0, 0, 0, 0],
                [1, 0, 0, 0, 0],
                [1, 0, 0, 0, 0]
            ],
            s: [
                [0, 1, 1, 1, 0],
                [1, 0, 0, 0, 0],
                [0, 1, 1, 0, 0],
                [0, 0, 0, 1, 0],
                [1, 1, 1, 0, 0]
            ],
            t: [
                [0, 1, 0, 0, 0],
                [1, 1, 1, 0, 0],
                [0, 1, 0, 0, 0],
                [0, 1, 0, 0, 1],
                [0, 0, 1, 1, 0]
            ],
            u: [
                [0, 0, 0, 0, 0],
                [1, 0, 0, 1, 0],
                [1, 0, 0, 1, 0],
                [1, 0, 0, 1, 0],
                [1, 1, 1, 0, 0]
            ],
            v: [
                [0, 0, 0, 0, 0],
                [1, 0, 0, 1, 0],
                [1, 0, 1, 0, 0],
                [1, 1, 0, 0, 0],
                [1, 0, 0, 0, 0]
            ],
            w: [
                [0, 0, 0, 0, 0],
                [1, 0, 1, 0, 1],
                [1, 0, 1, 0, 1],
                [1, 0, 1, 0, 1],
                [0, 1, 0, 1, 0]
            ],
            x: [
                [0, 0, 0, 0, 0],
                [1, 0, 0, 1, 0],
                [0, 1, 1, 0, 0],
                [0, 1, 1, 0, 0],
                [1, 0, 0, 1, 0]
            ],
            y: [
                [1, 0, 0, 1, 0],
                [1, 0, 0, 1, 0],
                [0, 1, 1, 1, 0],
                [0, 0, 0, 1, 0],
                [1, 1, 1, 0, 0]
            ],
            z: [
                [0, 0, 0, 0, 0],
                [1, 1, 1, 1, 0],
                [0, 0, 1, 0, 0],
                [0, 1, 0, 0, 0],
                [1, 1, 1, 1, 0]
            ],
            A: [
                [1, 1, 1, 1, 1],
                [1, 0, 0, 0, 1],
                [1, 1, 1, 1, 1],
                [1, 0, 0, 0, 1],
                [1, 0, 0, 0, 1]
            ],
            B: [
                [1, 1, 1, 1, 0],
                [1, 0, 0, 0, 1],
                [1, 1, 1, 1, 0],
                [1, 0, 0, 0, 1],
                [1, 1, 1, 1, 0]
            ],
            C: [
                [1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0],
                [1, 0, 0, 0, 0],
                [1, 0, 0, 0, 0],
                [1, 1, 1, 1, 1]
            ],
            D: [
                [1, 1, 1, 1, 0],
                [1, 0, 0, 0, 1],
                [1, 0, 0, 0, 1],
                [1, 0, 0, 0, 1],
                [1, 1, 1, 1, 0]
            ],
            E: [
                [1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0],
                [1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0],
                [1, 1, 1, 1, 1]
            ],
            F: [
                [1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0],
                [1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0],
                [1, 0, 0, 0, 0]
            ],
            G: [
                [0, 1, 1, 1, 1],
                [1, 0, 0, 0, 0],
                [1, 0, 0, 1, 1],
                [1, 0, 0, 0, 1],
                [0, 1, 1, 1, 1]
            ],
            H: [
                [1, 0, 0, 0, 1],
                [1, 0, 0, 0, 1],
                [1, 1, 1, 1, 1],
                [1, 0, 0, 0, 1],
                [1, 0, 0, 0, 1]
            ],
            I: [
                [1, 1, 1, 1, 1],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [1, 1, 1, 1, 1]
            ],
            J: [
                [1, 1, 1, 1, 1],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [1, 1, 1, 0, 0]
            ],
            K: [
                [1, 0, 0, 0, 1],
                [1, 0, 1, 1, 0],
                [1, 1, 0, 0, 0],
                [1, 0, 1, 1, 0],
                [1, 0, 0, 0, 1]
            ],
            L: [
                [1, 0, 0, 0, 0],
                [1, 0, 0, 0, 0],
                [1, 0, 0, 0, 0],
                [1, 0, 0, 0, 0],
                [1, 1, 1, 1, 1]
            ],
            M: [
                [1, 1, 1, 1, 1],
                [1, 0, 1, 0, 1],
                [1, 0, 1, 0, 1],
                [1, 0, 1, 0, 1],
                [1, 0, 1, 0, 1]
            ],
            N: [
                [1, 0, 0, 0, 1],
                [1, 1, 0, 0, 1],
                [1, 0, 1, 0, 1],
                [1, 0, 0, 1, 1],
                [1, 0, 0, 0, 1]
            ],
            O: [
                [1, 1, 1, 1, 1],
                [1, 0, 0, 0, 1],
                [1, 0, 0, 0, 1],
                [1, 0, 0, 0, 1],
                [1, 1, 1, 1, 1]
            ],
            P: [
                [1, 1, 1, 1, 1],
                [1, 0, 0, 0, 1],
                [1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0],
                [1, 0, 0, 0, 0]
            ],
            Q: [
                [1, 1, 1, 1, 1],
                [1, 0, 0, 0, 1],
                [1, 1, 1, 1, 1],
                [0, 0, 0, 0, 1],
                [0, 0, 0, 0, 1]
            ],
            R: [
                [1, 1, 1, 1, 0],
                [1, 0, 0, 0, 1],
                [1, 1, 1, 1, 0],
                [1, 0, 0, 0, 1],
                [1, 0, 0, 0, 1]
            ],
            S: [
                [0, 1, 1, 1, 1],
                [1, 0, 0, 0, 0],
                [0, 1, 1, 1, 0],
                [0, 0, 0, 0, 1],
                [1, 1, 1, 1, 0]
            ],
            T: [
                [1, 1, 1, 1, 1],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0]
            ],
            U: [
                [1, 0, 0, 0, 1],
                [1, 0, 0, 0, 1],
                [1, 0, 0, 0, 1],
                [1, 0, 0, 0, 1],
                [1, 1, 1, 1, 1]
            ],
            V: [
                [1, 0, 0, 0, 1],
                [0, 1, 0, 1, 0],
                [0, 1, 0, 1, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0]
            ],
            W: [
                [1, 0, 1, 0, 1],
                [1, 0, 1, 0, 1],
                [1, 0, 1, 0, 1],
                [1, 0, 1, 0, 1],
                [0, 1, 0, 1, 0]
            ],
            X: [
                [1, 0, 0, 0, 1],
                [0, 1, 0, 1, 0],
                [0, 0, 1, 0, 0],
                [0, 1, 0, 1, 0],
                [1, 0, 0, 0, 1]
            ],
            Y: [
                [1, 0, 0, 0, 1],
                [1, 0, 0, 0, 1],
                [1, 1, 1, 1, 1],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0]
            ],
            Z: [
                [1, 1, 1, 1, 1],
                [0, 0, 0, 1, 0],
                [0, 0, 1, 0, 0],
                [0, 1, 0, 0, 0],
                [1, 1, 1, 1, 1]
            ],
            0: [
                [1, 1, 1, 1, 1],
                [1, 0, 0, 1, 1],
                [1, 0, 1, 0, 1],
                [1, 1, 0, 0, 1],
                [1, 1, 1, 1, 1]
            ],
            1: [
                [1, 1, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [1, 1, 1, 1, 1]
            ],
            2: [
                [1, 1, 1, 1, 1],
                [0, 0, 0, 0, 1],
                [1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0],
                [1, 1, 1, 1, 1]
            ],
            3: [
                [1, 1, 1, 1, 0],
                [0, 0, 0, 0, 1],
                [0, 0, 1, 1, 0],
                [0, 0, 0, 0, 1],
                [1, 1, 1, 1, 0]
            ],
            4: [
                [1, 0, 0, 0, 0],
                [1, 0, 0, 0, 0],
                [1, 0, 0, 1, 0],
                [1, 1, 1, 1, 1],
                [0, 0, 0, 1, 0]
            ],
            5: [
                [1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0],
                [1, 1, 1, 1, 0],
                [0, 0, 0, 0, 1],
                [1, 1, 1, 1, 0]
            ],
            6: [
                [0, 1, 1, 1, 0],
                [1, 0, 0, 0, 0],
                [1, 1, 1, 1, 0],
                [1, 0, 0, 0, 1],
                [0, 1, 1, 1, 0]
            ],
            7: [
                [1, 1, 1, 1, 1],
                [0, 0, 0, 0, 1],
                [0, 0, 0, 1, 0],
                [0, 0, 1, 0, 0],
                [0, 1, 0, 0, 0]
            ],
            8: [
                [0, 1, 1, 1, 0],
                [1, 0, 0, 0, 1],
                [0, 1, 1, 1, 0],
                [1, 0, 0, 0, 1],
                [0, 1, 1, 1, 0]
            ],
            9: [
                [0, 1, 1, 1, 0],
                [1, 0, 0, 0, 1],
                [0, 1, 1, 1, 1],
                [0, 0, 0, 0, 1],
                [0, 1, 1, 1, 0]
            ],
            ".": [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0]
            ],
            ",": [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 1, 1, 0, 0]
            ],
            ";": [
                [0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 1, 1, 0, 0]
            ],
            ":": [
                [0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 0, 0, 0]
            ],
            "?": [
                [0, 1, 1, 1, 0],
                [1, 0, 0, 0, 1],
                [0, 0, 1, 1, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0]
            ],
            "!": [
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0]
            ],
            "@": [
                [0, 1, 1, 1, 0],
                [1, 0, 0, 0, 1],
                [1, 0, 1, 1, 1],
                [1, 0, 0, 0, 0],
                [0, 1, 1, 1, 0]
            ],
            "£": [
                [0, 1, 1, 1, 0],
                [0, 1, 0, 0, 1],
                [1, 1, 1, 0, 0],
                [0, 1, 0, 0, 0],
                [1, 1, 1, 1, 1]
            ],
            $: [
                [0, 1, 1, 1, 1],
                [1, 0, 1, 0, 0],
                [0, 1, 1, 1, 0],
                [0, 0, 1, 0, 1],
                [1, 1, 1, 1, 0]
            ],
            "%": [
                [1, 1, 0, 0, 1],
                [1, 1, 0, 1, 0],
                [0, 0, 1, 0, 0],
                [0, 1, 0, 1, 1],
                [1, 0, 0, 1, 1]
            ],
            "^": [
                [0, 0, 1, 0, 0],
                [0, 1, 0, 1, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]
            ],
            "&": [
                [0, 1, 1, 0, 0],
                [1, 0, 0, 0, 0],
                [0, 1, 0, 1, 1],
                [1, 0, 0, 1, 0],
                [0, 1, 1, 0, 0]
            ],
            "*": [
                [0, 1, 0, 1, 0],
                [0, 0, 1, 0, 0],
                [0, 1, 0, 1, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]
            ],
            "(": [
                [0, 0, 0, 1, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 0, 1, 0]
            ],
            ")": [
                [0, 1, 0, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 1, 0, 0, 0]
            ],
            "+": [
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [1, 1, 1, 1, 1],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0]
            ],
            "-": [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 1, 1, 1, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]
            ],
            _: [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1]
            ],
            "=": [
                [0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1],
                [0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1],
                [0, 0, 0, 0, 0]
            ],
            " ": [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]
            ],
            "{": [
                [0, 0, 1, 1, 0],
                [0, 0, 1, 0, 0],
                [0, 1, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 1, 0]
            ],
            "}": [
                [0, 1, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 1, 0],
                [0, 0, 1, 0, 0],
                [0, 1, 1, 0, 0]
            ],
            "[": [
                [0, 0, 1, 1, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 1, 0]
            ],
            "]": [
                [0, 1, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 1, 1, 0, 0]
            ],
            "'": [
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]
            ],
            '"': [
                [0, 1, 0, 1, 0],
                [0, 1, 0, 1, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]
            ],
            "/": [
                [0, 0, 0, 0, 1],
                [0, 0, 0, 1, 0],
                [0, 0, 1, 0, 0],
                [0, 1, 0, 0, 0],
                [1, 0, 0, 0, 0]
            ],
            "\\": [
                [1, 0, 0, 0, 0],
                [0, 1, 0, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 0, 1, 0],
                [0, 0, 0, 0, 1]
            ],
            "|": [
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0]
            ],
            "<": [
                [0, 0, 0, 1, 0],
                [0, 0, 1, 0, 0],
                [0, 1, 0, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 0, 1, 0]
            ],
            ">": [
                [0, 1, 0, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 0, 1, 0],
                [0, 0, 1, 0, 0],
                [0, 1, 0, 0, 0]
            ],
            "~": [
                [0, 0, 0, 0, 0],
                [0, 1, 0, 0, 0],
                [1, 0, 1, 0, 1],
                [0, 0, 0, 1, 0],
                [0, 0, 0, 0, 0]
            ],
            "`": [
                [0, 1, 0, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]
            ],
            "#": [
                [0, 1, 0, 1, 0],
                [1, 1, 1, 1, 1],
                [0, 1, 0, 1, 0],
                [1, 1, 1, 1, 1],
                [0, 1, 0, 1, 0]
            ]
        };
    
        function RC4(t) {
            this.s = new Array(256), this.i = 0, this.j = 0;
            for (var i = 0; i < 256; i++) this.s[i] = i;
            t && this.mix(t)
        }

        function print_call_stack() {
            var t = new Error,
                i = t.stack;
            console.log(i)
        }

        function RNG(t) {
            this.seed = t, null == t ? t = (Math.random() + Date.now()).toString() : "function" == typeof t ? (this.uniform = t, this.nextByte = function() {
                return ~~(256 * this.uniform())
            }, t = null) : "[object String]" !== Object.prototype.toString.call(t) && (t = JSON.stringify(t)), this._normal = null, t ? this._state = new RC4(t) : this._state = null
        }
        String.prototype.getBytes = function() {
            for (var t = [], i = 0; i < this.length; i++) {
                var n = this.charCodeAt(i),
                    o = [];
                do o.push(255 & n), n >>= 8; while (n > 0);
                t = t.concat(o.reverse())
            }
            return t
        }, RC4.prototype._swap = function(t, i) {
            var n = this.s[t];
            this.s[t] = this.s[i], this.s[i] = n
        }, RC4.prototype.mix = function(t) {
            for (var i = t.getBytes(), n = 0, o = 0; o < this.s.length; o++) n += this.s[o] + i[o % i.length], n %= 256, this._swap(o, n)
        }, RC4.prototype.next = function() {
            return this.i = (this.i + 1) % 256, this.j = (this.j + this.s[this.i]) % 256, this._swap(this.i, this.j), this.s[(this.s[this.i] + this.s[this.j]) % 256]
        }, RNG.prototype.nextByte = function() {
            return this._state.next()
        }, RNG.prototype.uniform = function() {
            for (var t = 7, i = 0, n = 0; n < t; n++) i *= 256, i += this.nextByte();
            return i / (Math.pow(2, 8 * t) - 1)
        }, RNG.prototype.random = function(t, i) {
            return null == t ? this.uniform() : (null == i && (i = t, t = 0), t + Math.floor(this.uniform() * (i - t)))
        }, RNG.prototype.normal = function() {
            if (null !== this._normal) {
                var t = this._normal;
                return this._normal = null, t
            }
            var i = this.uniform() || Math.pow(2, -53),
                n = this.uniform();
            return this._normal = Math.sqrt(-2 * Math.log(i)) * Math.sin(2 * Math.PI * n), Math.sqrt(-2 * Math.log(i)) * Math.cos(2 * Math.PI * n)
        }, RNG.prototype.exponential = function() {
            return -Math.log(this.uniform() || Math.pow(2, -53))
        }, RNG.prototype.poisson = function(t) {
            var i = Math.exp(-(t || 1)),
                n = 0,
                o = 1;
            do n++, o *= this.uniform(); while (o > i);
            return n - 1
        }, RNG.prototype.gamma = function(t) {
            var i = (t < 1 ? 1 + t : t) - 1 / 3,
                n = 1 / Math.sqrt(9 * i);
            do {
                do var o = this.normal(),
                    r = Math.pow(n * o + 1, 3); while (r <= 0);
                var s = this.uniform(),
                    h = Math.pow(o, 2)
            } while (s >= 1 - .0331 * h * h && Math.log(s) >= .5 * h + i * (1 - r + Math.log(r)));
            return t < 1 ? i * r * Math.exp(this.exponential() / -t) : i * r
        }, RNG.roller = function(t, i) {
            var n = t.split(/(\d+)?d(\d+)([+-]\d+)?/).slice(1),
                o = parseFloat(n[0]) || 1,
                r = parseFloat(n[1]),
                s = parseFloat(n[2]) || 0;
            return i = i || new RNG,
                function() {
                    for (var t = o + s, n = 0; n < o; n++) t += i.random(r);
                    return t
                }
        };
    
        function FastBase64_Init() {
            for (var a = 0; a < 4096; a++) FastBase64_encLookup[a] = FastBase64_chars[a >> 6] + FastBase64_chars[63 & a]
        }

        function FastBase64_Encode(a) {
            for (var e = a.length, s = "", u = 0; e > 2;) n = a[u] << 16 | a[u + 1] << 8 | a[u + 2], s += FastBase64_encLookup[n >> 12] + FastBase64_encLookup[4095 & n], e -= 3, u += 3;
            if (e > 0) {
                var r = (252 & a[u]) >> 2,
                    t = (3 & a[u]) << 4;
                if (e > 1 && (t |= (240 & a[++u]) >> 4), s += FastBase64_chars[r], s += FastBase64_chars[t], 2 == e) {
                    var o = (15 & a[u++]) << 2;
                    o |= (192 & a[u]) >> 6, s += FastBase64_chars[o]
                }
                1 == e && (s += "="), s += "="
            }
            return s
        }

        function u32ToArray(a) {
            return [255 & a, a >> 8 & 255, a >> 16 & 255, a >> 24 & 255]
        }

        function u16ToArray(a) {
            return [255 & a, a >> 8 & 255]
        }

        function MakeRiff(a, e, n) {
            var s = [],
                u = [],
                r = [],
                t = {
                    chunkId: [82, 73, 70, 70],
                    chunkSize: 0,
                    format: [87, 65, 86, 69],
                    subChunk1Id: [102, 109, 116, 32],
                    subChunk1Size: 16,
                    audioFormat: 1,
                    numChannels: 1,
                    sampleRate: a,
                    byteRate: 0,
                    blockAlign: 0,
                    bitsPerSample: e,
                    subChunk2Id: [100, 97, 116, 97],
                    subChunk2Size: 0
                };
            t.byteRate = t.sampleRate * t.numChannels * t.bitsPerSample >> 3, t.blockAlign = t.numChannels * t.bitsPerSample >> 3, t.subChunk2Size = n.length, t.chunkSize = 36 + t.subChunk2Size, u = t.chunkId.concat(u32ToArray(t.chunkSize), t.format, t.subChunk1Id, u32ToArray(t.subChunk1Size), u16ToArray(t.audioFormat), u16ToArray(t.numChannels), u32ToArray(t.sampleRate), u32ToArray(t.byteRate), u16ToArray(t.blockAlign), u16ToArray(t.bitsPerSample), t.subChunk2Id, u32ToArray(t.subChunk2Size), n), r = "data:audio/wav;base64," + FastBase64_Encode(u);
            var o = {
                dat: s,
                wav: u,
                header: t,
                dataURI: r
            };
            return o
        }
        var FastBase64_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            FastBase64_encLookup = [];
        FastBase64_Init(), "undefined" != typeof exports && (exports.RIFFWAVE = RIFFWAVE);
    
        function checkAudioContextExists() {
            try {
                null == AUDIO_CONTEXT && ("undefined" != typeof AudioContext ? AUDIO_CONTEXT = new AudioContext : "undefined" != typeof webkitAudioContext && (AUDIO_CONTEXT = new webkitAudioContext))
            } catch (e) {
                window.console.log(e)
            }
        }

        function Params() {
            var e = {};
            return e.wave_type = SQUARE, e.p_env_attack = 0, e.p_env_sustain = .3, e.p_env_punch = 0, e.p_env_decay = .4, e.p_base_freq = .3, e.p_freq_limit = 0, e.p_freq_ramp = 0, e.p_freq_dramp = 0, e.p_vib_strength = 0, e.p_vib_speed = 0, e.p_arp_mod = 0, e.p_arp_speed = 0, e.p_duty = 0, e.p_duty_ramp = 0, e.p_repeat_speed = 0, e.p_pha_offset = 0, e.p_pha_ramp = 0, e.p_lpf_freq = 1, e.p_lpf_ramp = 0, e.p_lpf_resonance = 0, e.p_hpf_freq = 0, e.p_hpf_ramp = 0, e.sound_vol = .5, e.sample_rate = 44100, e.bit_depth = 8, e
        }

        function frnd(e) {
            return seeded ? rng.uniform() * e : Math.random() * e
        }

        function rnd(e) {
            return seeded ? Math.floor(rng.uniform() * (e + 1)) : Math.floor(Math.random() * (e + 1))
        }

        function SoundEffect(e, r) {
            this._buffer = AUDIO_CONTEXT.createBuffer(1, e, r)
        }

        function cacheSeed(e) {
            if (e in sfxCache) return sfxCache[e];
            var r = generateFromSeed(e);
            r.sound_vol = SOUND_VOL, r.sample_rate = SAMPLE_RATE, r.bit_depth = BIT_DEPTH;
            var _ = SoundEffect.generate(r);
            for (sfxCache[e] = _, cachedSeeds.push(e); cachedSeeds.length > CACHE_MAX;) {
                var p = cachedSeeds[0];
                cachedSeeds = cachedSeeds.slice(1), delete sfxCache[p]
            }
            return _
        }

        function playSound(e) {
            if (!muted && (checkAudioContextExists(), !unitTesting)) {
                var r = cacheSeed(e);
                r.play()
            }
        }

        function killAudioButton() {
            var e = document.getElementById("muteButton"),
                r = document.getElementById("unMuteButton");
            e && (e.remove(), r.remove())
        }

        function showAudioButton() {
            var e = document.getElementById("muteButton"),
                r = document.getElementById("unMuteButton");
            e && (e.style.display = "block", r.style.display = "none")
        }

        function toggleMute() {
            0 === muted ? muteAudio() : unMuteAudio()
        }

        function muteAudio() {
            muted = 1, tryDeactivateYoutube();
            var e = document.getElementById("muteButton"),
                r = document.getElementById("unMuteButton");
            e && (e.style.display = "none", r.style.display = "block")
        }

        function unMuteAudio() {
            muted = 0, tryActivateYoutube();
            var e = document.getElementById("muteButton"),
                r = document.getElementById("unMuteButton");
            e && (e.style.display = "block", r.style.display = "none")
        }
        var SOUND_VOL = .25,
            SAMPLE_RATE = 5512,
            BIT_DEPTH = 8,
            SQUARE = 0,
            SAWTOOTH = 1,
            SINE = 2,
            NOISE = 3,
            TRIANGLE = 4,
            BREAKER = 5,
            SHAPES = ["square", "sawtooth", "sine", "noise", "triangle", "breaker"],
            AUDIO_CONTEXT;
        checkAudioContextExists();
        var masterVolume = 1,
            rng, seeded = !1;
        pickupCoin = function() {
            var e = Params();
            if (e.wave_type = Math.floor(frnd(SHAPES.length)), 3 === e.wave_type && (e.wave_type = 0), e.p_base_freq = .4 + frnd(.5), e.p_env_attack = 0, e.p_env_sustain = frnd(.1), e.p_env_decay = .1 + frnd(.4), e.p_env_punch = .3 + frnd(.3), rnd(1)) {
                e.p_arp_speed = .5 + frnd(.2);
                var r = (1 | frnd(7)) + 1,
                    _ = r + (1 | frnd(7)) + 2;
                e.p_arp_mod = +r / +_
            }
            return e
        }, laserShoot = function() {
            var e = Params();
            return e.wave_type = rnd(2), e.wave_type === SINE && rnd(1) && (e.wave_type = rnd(1)), e.wave_type = Math.floor(frnd(SHAPES.length)), 3 === e.wave_type && (e.wave_type = SQUARE), e.p_base_freq = .5 + frnd(.5), e.p_freq_limit = e.p_base_freq - .2 - frnd(.6), e.p_freq_limit < .2 && (e.p_freq_limit = .2), e.p_freq_ramp = -.15 - frnd(.2), 0 === rnd(2) && (e.p_base_freq = .3 + frnd(.6), e.p_freq_limit = frnd(.1), e.p_freq_ramp = -.35 - frnd(.3)), rnd(1) ? (e.p_duty = frnd(.5), e.p_duty_ramp = frnd(.2)) : (e.p_duty = .4 + frnd(.5), e.p_duty_ramp = -frnd(.7)), e.p_env_attack = 0, e.p_env_sustain = .1 + frnd(.2), e.p_env_decay = frnd(.4), rnd(1) && (e.p_env_punch = frnd(.3)), 0 === rnd(2) && (e.p_pha_offset = frnd(.2), e.p_pha_ramp = -frnd(.2)), rnd(1) && (e.p_hpf_freq = frnd(.3)), e
        }, explosion = function() {
            var e = Params();
            return rnd(1) ? (e.p_base_freq = .1 + frnd(.4), e.p_freq_ramp = -.1 + frnd(.4)) : (e.p_base_freq = .2 + frnd(.7), e.p_freq_ramp = -.2 - frnd(.2)), e.p_base_freq *= e.p_base_freq, 0 === rnd(4) && (e.p_freq_ramp = 0), 0 === rnd(2) && (e.p_repeat_speed = .3 + frnd(.5)), e.p_env_attack = 0, e.p_env_sustain = .1 + frnd(.3), e.p_env_decay = frnd(.5), 0 === rnd(1) && (e.p_pha_offset = -.3 + frnd(.9), e.p_pha_ramp = -frnd(.3)), e.p_env_punch = .2 + frnd(.6), rnd(1) && (e.p_vib_strength = frnd(.7), e.p_vib_speed = frnd(.6)), 0 === rnd(2) && (e.p_arp_speed = .6 + frnd(.3), e.p_arp_mod = .8 - frnd(1.6)), e
        }, birdSound = function() {
            var e = Params();
            return frnd(10) < 1 ? (e.wave_type = Math.floor(frnd(SHAPES.length)), 3 === e.wave_type && (e.wave_type = SQUARE), e.p_env_attack = .4304400932967592 + frnd(.2) - .1, e.p_env_sustain = .15739346034252394 + frnd(.2) - .1, e.p_env_punch = .004488201744871758 + frnd(.2) - .1, e.p_env_decay = .07478075528212291 + frnd(.2) - .1, e.p_base_freq = .9865265720147687 + frnd(.2) - .1, e.p_freq_limit = 0 + frnd(.2) - .1, e.p_freq_ramp = -.2995018224359539 + frnd(.2) - .1, frnd(1) < .5 && (e.p_freq_ramp = .1 + frnd(.15)), e.p_freq_dramp = .004598608156964473 + frnd(.1) - .05, e.p_vib_strength = -.2202799497929496 + frnd(.2) - .1, e.p_vib_speed = .8084998703158364 + frnd(.2) - .1, e.p_arp_mod = 0, e.p_arp_speed = 0, e.p_duty = -.9031808754347107 + frnd(.2) - .1, e.p_duty_ramp = -.8128699999808343 + frnd(.2) - .1, e.p_repeat_speed = .601486018931999 + frnd(.2) - .1, e.p_pha_offset = -.9424902314367765 + frnd(.2) - .1, e.p_pha_ramp = -.1055482222272056 + frnd(.2) - .1, e.p_lpf_freq = .9989765717851521 + frnd(.2) - .1, e.p_lpf_ramp = -.25051720626043017 + frnd(.2) - .1, e.p_lpf_resonance = .32777871505494693 + frnd(.2) - .1, e.p_hpf_freq = .0023548750981756753 + frnd(.2) - .1, e.p_hpf_ramp = -.002375673204842568 + frnd(.2) - .1, e) : frnd(10) < 1 ? (e.wave_type = Math.floor(frnd(SHAPES.length)), 3 === e.wave_type && (e.wave_type = SQUARE), e.p_env_attack = .5277795946672003 + frnd(.2) - .1, e.p_env_sustain = .18243733568468432 + frnd(.2) - .1, e.p_env_punch = -.020159754546840117 + frnd(.2) - .1, e.p_env_decay = .1561353422051903 + frnd(.2) - .1, e.p_base_freq = .9028855606533718 + frnd(.2) - .1, e.p_freq_limit = -.008842787837148716, e.p_freq_ramp = -.1, e.p_freq_dramp = -.012891241489551925, e.p_vib_strength = -.17923136138403065 + frnd(.2) - .1, e.p_vib_speed = .908263385610142 + frnd(.2) - .1, e.p_arp_mod = .41690153355414894 + frnd(.2) - .1, e.p_arp_speed = .0010766233195860704 + frnd(.2) - .1, e.p_duty = -.8735363011184684 + frnd(.2) - .1, e.p_duty_ramp = -.7397985366747507 + frnd(.2) - .1, e.p_repeat_speed = .0591789344172107 + frnd(.2) - .1, e.p_pha_offset = -.9961184222777699 + frnd(.2) - .1, e.p_pha_ramp = -.08234769395850523 + frnd(.2) - .1, e.p_lpf_freq = .9412475115697335 + frnd(.2) - .1, e.p_lpf_ramp = -.18261358925834958 + frnd(.2) - .1, e.p_lpf_resonance = .24541438107389477 + frnd(.2) - .1, e.p_hpf_freq = -.01831940280978611 + frnd(.2) - .1, e.p_hpf_ramp = -.03857383633171346 + frnd(.2) - .1, e) : frnd(10) < 1 ? (e.wave_type = Math.floor(frnd(SHAPES.length)), 3 === e.wave_type && (e.wave_type = SQUARE), e.p_env_attack = .4304400932967592 + frnd(.2) - .1, e.p_env_sustain = .15739346034252394 + frnd(.2) - .1, e.p_env_punch = .004488201744871758 + frnd(.2) - .1, e.p_env_decay = .07478075528212291 + frnd(.2) - .1, e.p_base_freq = .9865265720147687 + frnd(.2) - .1, e.p_freq_limit = 0 + frnd(.2) - .1, e.p_freq_ramp = -.2995018224359539 + frnd(.2) - .1, e.p_freq_dramp = .004598608156964473 + frnd(.2) - .1, e.p_vib_strength = -.2202799497929496 + frnd(.2) - .1, e.p_vib_speed = .8084998703158364 + frnd(.2) - .1, e.p_arp_mod = -.46410459213693644 + frnd(.2) - .1, e.p_arp_speed = -.10955361249587248 + frnd(.2) - .1, e.p_duty = -.9031808754347107 + frnd(.2) - .1, e.p_duty_ramp = -.8128699999808343 + frnd(.2) - .1, e.p_repeat_speed = .7014860189319991 + frnd(.2) - .1, e.p_pha_offset = -.9424902314367765 + frnd(.2) - .1, e.p_pha_ramp = -.1055482222272056 + frnd(.2) - .1, e.p_lpf_freq = .9989765717851521 + frnd(.2) - .1, e.p_lpf_ramp = -.25051720626043017 + frnd(.2) - .1, e.p_lpf_resonance = .32777871505494693 + frnd(.2) - .1, e.p_hpf_freq = .0023548750981756753 + frnd(.2) - .1, e.p_hpf_ramp = -.002375673204842568 + frnd(.2) - .1, e) : frnd(5) > 1 ? (e.wave_type = Math.floor(frnd(SHAPES.length)), 3 === e.wave_type && (e.wave_type = SQUARE), rnd(1) ? (e.p_arp_mod = .2697849293151393 + frnd(.2) - .1, e.p_arp_speed = -.3131172257760948 + frnd(.2) - .1, e.p_base_freq = .8090588299313949 + frnd(.2) - .1, e.p_duty = -.6210022920964955 + frnd(.2) - .1, e.p_duty_ramp = -.00043441813553182567 + frnd(.2) - .1, e.p_env_attack = .004321877246874195 + frnd(.2) - .1, e.p_env_decay = .1 + frnd(.2) - .1, e.p_env_punch = .061737781504416146 + frnd(.2) - .1, e.p_env_sustain = .4987252564798832 + frnd(.2) - .1, e.p_freq_dramp = .31700340314222614 + frnd(.2) - .1, e.p_freq_limit = 0 + frnd(.2) - .1, e.p_freq_ramp = -.163380391341416 + frnd(.2) - .1, e.p_hpf_freq = .4709005021145149 + frnd(.2) - .1, e.p_hpf_ramp = .6924667290539194 + frnd(.2) - .1, e.p_lpf_freq = .8351398631384511 + frnd(.2) - .1, e.p_lpf_ramp = .36616557192873134 + frnd(.2) - .1, e.p_lpf_resonance = -.08685777111664439 + frnd(.2) - .1, e.p_pha_offset = -.036084571580025544 + frnd(.2) - .1, e.p_pha_ramp = -.014806445085568108 + frnd(.2) - .1, e.p_repeat_speed = -.8094368475518489 + frnd(.2) - .1, e.p_vib_speed = .4496665457171294 + frnd(.2) - .1, e.p_vib_strength = .23413762515532424 + frnd(.2) - .1) : (e.p_arp_mod = -.35697118026766184 + frnd(.2) - .1, e.p_arp_speed = .3581140690559588 + frnd(.2) - .1, e.p_base_freq = 1.3260897696157528 + frnd(.2) - .1, e.p_duty = -.30984900436710694 + frnd(.2) - .1, e.p_duty_ramp = -.0014374759133411626 + frnd(.2) - .1, e.p_env_attack = .3160357835682254 + frnd(.2) - .1, e.p_env_decay = .1 + frnd(.2) - .1, e.p_env_punch = .24323114016870148 + frnd(.2) - .1, e.p_env_sustain = .4 + frnd(.2) - .1, e.p_freq_dramp = .2866475886237244 + frnd(.2) - .1, e.p_freq_limit = 0 + frnd(.2) - .1, e.p_freq_ramp = -.10956352368742976 + frnd(.2) - .1, e.p_hpf_freq = .20772718017889846 + frnd(.2) - .1, e.p_hpf_ramp = .1564090637378835 + frnd(.2) - .1, e.p_lpf_freq = .6021372770637031 + frnd(.2) - .1, e.p_lpf_ramp = .24016227139979027 + frnd(.2) - .1, e.p_lpf_resonance = -.08787383821160144 + frnd(.2) - .1, e.p_pha_offset = -.381597686151701 + frnd(.2) - .1, e.p_pha_ramp = -.0002481687661373495 + frnd(.2) - .1, e.p_repeat_speed = .07812112809425686 + frnd(.2) - .1, e.p_vib_speed = -.13648848579133943 + frnd(.2) - .1, e.p_vib_strength = .0018874158972302657 + frnd(.2) - .1), e) : (e.wave_type = Math.floor(frnd(SHAPES.length)), 1 !== e.wave_type && 3 !== e.wave_type || (e.wave_type = 2), e.p_base_freq = .85 + frnd(.15), e.p_freq_ramp = .3 + frnd(.15), e.p_env_attack = 0 + frnd(.09), e.p_env_sustain = .2 + frnd(.3), e.p_env_decay = 0 + frnd(.1), e.p_duty = frnd(2) - 1, e.p_duty_ramp = Math.pow(frnd(2) - 1, 3), e.p_repeat_speed = .5 + frnd(.1), e.p_pha_offset = -.3 + frnd(.9), e.p_pha_ramp = -frnd(.3), e.p_arp_speed = .4 + frnd(.6), e.p_arp_mod = .8 + frnd(.1), e.p_lpf_resonance = frnd(2) - 1, e.p_lpf_freq = 1 - Math.pow(frnd(1), 3), e.p_lpf_ramp = Math.pow(frnd(2) - 1, 3), e.p_lpf_freq < .1 && e.p_lpf_ramp < -.05 && (e.p_lpf_ramp = -e.p_lpf_ramp), e.p_hpf_freq = Math.pow(frnd(1), 5), e.p_hpf_ramp = Math.pow(frnd(2) - 1, 5), e)
        }, pushSound = function() {
            var e = Params();
            return e.wave_type = Math.floor(frnd(SHAPES.length)), 2 === e.wave_type && e.wave_type++, 0 === e.wave_type && (e.wave_type = NOISE), e.p_base_freq = .1 + frnd(.4), e.p_freq_ramp = .05 + frnd(.2), e.p_env_attack = .01 + frnd(.09), e.p_env_sustain = .01 + frnd(.09), e.p_env_decay = .01 + frnd(.09), e.p_repeat_speed = .3 + frnd(.5), e.p_pha_offset = -.3 + frnd(.9), e.p_pha_ramp = -frnd(.3), e.p_arp_speed = .6 + frnd(.3), e.p_arp_mod = .8 - frnd(1.6), e
        }, powerUp = function() {
            var e = Params();
            return rnd(1) ? e.wave_type = SAWTOOTH : e.p_duty = frnd(.6), e.wave_type = Math.floor(frnd(SHAPES.length)), 3 === e.wave_type && (e.wave_type = SQUARE), rnd(1) ? (e.p_base_freq = .2 + frnd(.3), e.p_freq_ramp = .1 + frnd(.4), e.p_repeat_speed = .4 + frnd(.4)) : (e.p_base_freq = .2 + frnd(.3), e.p_freq_ramp = .05 + frnd(.2), rnd(1) && (e.p_vib_strength = frnd(.7), e.p_vib_speed = frnd(.6))), e.p_env_attack = 0, e.p_env_sustain = frnd(.4), e.p_env_decay = .1 + frnd(.4), e
        }, hitHurt = function() {
            return result = Params(), result.wave_type = rnd(2), result.wave_type === SINE && (result.wave_type = NOISE), result.wave_type === SQUARE && (result.p_duty = frnd(.6)), result.wave_type = Math.floor(frnd(SHAPES.length)), result.p_base_freq = .2 + frnd(.6), result.p_freq_ramp = -.3 - frnd(.4), result.p_env_attack = 0, result.p_env_sustain = frnd(.1), result.p_env_decay = .1 + frnd(.2), rnd(1) && (result.p_hpf_freq = frnd(.3)), result
        }, jump = function() {
            return result = Params(), result.wave_type = SQUARE, result.wave_type = Math.floor(frnd(SHAPES.length)), 3 === result.wave_type && (result.wave_type = SQUARE), result.p_duty = frnd(.6), result.p_base_freq = .3 + frnd(.3), result.p_freq_ramp = .1 + frnd(.2), result.p_env_attack = 0, result.p_env_sustain = .1 + frnd(.3), result.p_env_decay = .1 + frnd(.2), rnd(1) && (result.p_hpf_freq = frnd(.3)), rnd(1) && (result.p_lpf_freq = 1 - frnd(.6)), result
        }, blipSelect = function() {
            return result = Params(), result.wave_type = rnd(1), result.wave_type = Math.floor(frnd(SHAPES.length)), 3 === result.wave_type && (result.wave_type = rnd(1)), result.wave_type === SQUARE && (result.p_duty = frnd(.6)), result.p_base_freq = .2 + frnd(.4), result.p_env_attack = 0, result.p_env_sustain = .1 + frnd(.1), result.p_env_decay = frnd(.2), result.p_hpf_freq = .1, result
        }, random = function() {
            return result = Params(), result.wave_type = Math.floor(frnd(SHAPES.length)), result.p_base_freq = Math.pow(frnd(2) - 1, 2), rnd(1) && (result.p_base_freq = Math.pow(frnd(2) - 1, 3) + .5), result.p_freq_limit = 0, result.p_freq_ramp = Math.pow(frnd(2) - 1, 5), result.p_base_freq > .7 && result.p_freq_ramp > .2 && (result.p_freq_ramp = -result.p_freq_ramp), result.p_base_freq < .2 && result.p_freq_ramp < -.05 && (result.p_freq_ramp = -result.p_freq_ramp), result.p_freq_dramp = Math.pow(frnd(2) - 1, 3), result.p_duty = frnd(2) - 1, result.p_duty_ramp = Math.pow(frnd(2) - 1, 3), result.p_vib_strength = Math.pow(frnd(2) - 1, 3), result.p_vib_speed = frnd(2) - 1, result.p_env_attack = Math.pow(frnd(2) - 1, 3), result.p_env_sustain = Math.pow(frnd(2) - 1, 2), result.p_env_decay = frnd(2) - 1, result.p_env_punch = Math.pow(frnd(.8), 2), result.p_env_attack + result.p_env_sustain + result.p_env_decay < .2 && (result.p_env_sustain += .2 + frnd(.3), result.p_env_decay += .2 + frnd(.3)), result.p_lpf_resonance = frnd(2) - 1, result.p_lpf_freq = 1 - Math.pow(frnd(1), 3), result.p_lpf_ramp = Math.pow(frnd(2) - 1, 3), result.p_lpf_freq < .1 && result.p_lpf_ramp < -.05 && (result.p_lpf_ramp = -result.p_lpf_ramp), result.p_hpf_freq = Math.pow(frnd(1), 5), result.p_hpf_ramp = Math.pow(frnd(2) - 1, 5), result.p_pha_offset = Math.pow(frnd(2) - 1, 3), result.p_pha_ramp = Math.pow(frnd(2) - 1, 3), result.p_repeat_speed = frnd(2) - 1, result.p_arp_speed = frnd(2) - 1, result.p_arp_mod = frnd(2) - 1, result
        };
        var generators = [pickupCoin, laserShoot, explosion, powerUp, hitHurt, jump, blipSelect, pushSound, random, birdSound],
            generatorNames = ["pickupCoin", "laserShoot", "explosion", "powerUp", "hitHurt", "jump", "blipSelect", "pushSound", "random", "birdSound"];
        if (generateFromSeed = function(e) {
                rng = new RNG(e / 100 | 0);
                var r = e % 100,
                    _ = generators[r % generators.length];
                seeded = !0;
                var p = _();
                return p.seed = e, seeded = !1, p
            }, SoundEffect.prototype.getBuffer = function() {
                return this._buffer.getChannelData(0)
            }, SoundEffect.prototype.play = function() {
                var e = AUDIO_CONTEXT.createBufferSource(),
                    r = AUDIO_CONTEXT.createBiquadFilter(),
                    _ = AUDIO_CONTEXT.createBiquadFilter(),
                    p = AUDIO_CONTEXT.createBiquadFilter();
                e.buffer = this._buffer, e.connect(r), r.frequency.value = 1600, _.frequency.value = 1600, p.frequency.value = 1600, r.connect(_), _.connect(p), p.connect(AUDIO_CONTEXT.destination);
                var n = AUDIO_CONTEXT.currentTime;
                "undefined" != typeof e.start ? e.start(n) : e.noteOn(n), e.onended = function() {
                    p.disconnect()
                }
            }, SoundEffect.MIN_SAMPLE_RATE = 22050, "undefined" == typeof AUDIO_CONTEXT && (SoundEffect = function(e, r) {
                this._sample_rate = r, this._buffer = new Array(e), this._audioElement = null
            }, SoundEffect.prototype.getBuffer = function() {
                return this._audioElement = null, this._buffer
            }, SoundEffect.prototype.play = function() {
                if (this._audioElement) this._audioElement.cloneNode(!1).play();
                else {
                    for (var e = 0; e < this._buffer.length; e++) this._buffer[e] = 255 & Math.floor(128 * Math.max(0, Math.min(this._buffer[e] + 1, 2)));
                    var r = MakeRiff(this._sample_rate, BIT_DEPTH, this._buffer);
                    this._audioElement = new Audio, this._audioElement.src = r.dataURI, this._audioElement.play()
                }
            }, SoundEffect.MIN_SAMPLE_RATE = 1), SoundEffect.generate = function(e) {
                function r() {
                    _ = 0, p = 100 / (e.p_base_freq * e.p_base_freq + .001), n = Math.floor(p), t = 100 / (e.p_freq_limit * e.p_freq_limit + .001), f = 1 - .01 * Math.pow(e.p_freq_ramp, 3), a = 1e-6 * -Math.pow(e.p_freq_dramp, 3), d = .5 - .5 * e.p_duty, s = 5e-5 * -e.p_duty_ramp, u = e.p_arp_mod >= 0 ? 1 - .9 * Math.pow(e.p_arp_mod, 2) : 1 + 10 * Math.pow(e.p_arp_mod, 2), o = 0, l = Math.floor(2e4 * Math.pow(1 - e.p_arp_speed, 2) + 32), 1 == e.p_arp_speed && (l = 0)
                }
                var _, p, n, t, f, a, d, s, u, o, l;
                r();
                var i = 0,
                    h = 0,
                    v = .1 * Math.pow(e.p_lpf_freq, 3),
                    m = 1 + 1e-4 * e.p_lpf_ramp,
                    c = 5 / (1 + 20 * Math.pow(e.p_lpf_resonance, 2)) * (.01 + v);
                c > .8 && (c = .8);
                var y = 0,
                    E = .1 * Math.pow(e.p_hpf_freq, 2),
                    w = 1 + 3e-4 * e.p_hpf_ramp,
                    q = 0,
                    S = .01 * Math.pow(e.p_vib_speed, 2),
                    M = .5 * e.p_vib_strength,
                    A = 0,
                    b = 0,
                    g = 0,
                    T = [Math.floor(e.p_env_attack * e.p_env_attack * 1e5), Math.floor(e.p_env_sustain * e.p_env_sustain * 1e5), Math.floor(e.p_env_decay * e.p_env_decay * 1e5)],
                    I = T[0] + T[1] + T[2],
                    O = 0,
                    P = 1020 * Math.pow(e.p_pha_offset, 2);
                e.p_pha_offset < 0 && (P = -P);
                var k = 1 * Math.pow(e.p_pha_ramp, 2);
                e.p_pha_ramp < 0 && (k = -k);
                for (var N = Math.abs(Math.floor(P)), C = 0, R = [], B = 0; B < 1024; ++B) R[B] = 0;
                for (var U = [], B = 0; B < 32; ++B) U[B] = 2 * Math.random() - 1;
                var H = Math.floor(2e4 * Math.pow(1 - e.p_repeat_speed, 2) + 32);
                0 == e.p_repeat_speed && (H = 0);
                var x, D = 2 * e.sound_vol,
                    D = Math.exp(e.sound_vol) - 1,
                    X = 0,
                    Q = 0,
                    L = Math.floor(44100 / e.sample_rate),
                    F = 0,
                    V = Math.ceil(I / L),
                    W = !1;
                x = e.sample_rate < SoundEffect.MIN_SAMPLE_RATE ? new SoundEffect(4 * V, SoundEffect.MIN_SAMPLE_RATE) : new SoundEffect(V, e.sample_rate);
                for (var j = x.getBuffer(), G = 0;; ++G) {
                    0 != H && ++_ >= H && r(), 0 != l && G >= l && (l = 0, p *= u), f += a, p *= f, p > t && (p = t, e.p_freq_limit > 0 && (W = !0));
                    var K = p;
                    if (M > 0 && (q += S, K = p * (1 + Math.sin(q) * M)), n = Math.floor(K), n < 8 && (n = 8), d += s, d < 0 && (d = 0), d > .5 && (d = .5), g++, g > T[b]) {
                        for (g = 1, b++; b < 3 && 0 === T[b];) b++;
                        if (3 === b) break
                    }
                    A = 0 === b ? g / T[0] : 1 === b ? 1 + 2 * Math.pow(1 - g / T[1], 1) * e.p_env_punch : 1 - g / T[2], P += k, N = Math.abs(Math.floor(P)), N > 1023 && (N = 1023), 0 != w && (E *= w, E < 1e-5 && (E = 1e-5), E > .1 && (E = .1));
                    for (var Y = 0, z = 0; z < 8; ++z) {
                        var J = 0;
                        if (O++, O >= n && (O %= n, e.wave_type === NOISE))
                            for (var B = 0; B < 32; ++B) U[B] = 2 * Math.random() - 1;
                        var Z = O / n;
                        if (e.wave_type === SQUARE) J = Z < d ? .5 : -.5;
                        else if (e.wave_type === SAWTOOTH) J = 1 - 2 * Z;
                        else if (e.wave_type === SINE) J = Math.sin(2 * Z * Math.PI);
                        else if (e.wave_type === NOISE) J = U[Math.floor(32 * O / n)];
                        else if (e.wave_type === TRIANGLE) J = Math.abs(1 - 2 * Z) - 1;
                        else {
                            if (e.wave_type !== BREAKER) throw new Exception("bad wave type! " + e.wave_type);
                            J = Math.abs(1 - Z * Z * 2) - 1
                        }
                        var $ = i;
                        v *= m, v < 0 && (v = 0), v > .1 && (v = .1), 1 != e.p_lpf_freq ? (h += (J - i) * v, h -= h * c) : (i = J, h = 0), i += h, y += i - $, y -= y * E, J = y, R[1023 & C] = J, J += R[C - N + 1024 & 1023], C = C + 1 & 1023, Y += J * A
                    }
                    X += Y, ++Q >= L && (Q = 0, Y = X / L, X = 0, Y = Y / 8 * masterVolume, Y *= D, j[F++] = Y, e.sample_rate < SoundEffect.MIN_SAMPLE_RATE && (j[F++] = Y, j[F++] = Y, j[F++] = Y))
                }
                return L > 0 && (Y = X / L, Y = Y / 8 * masterVolume, Y *= D, j[F++] = Y, e.sample_rate < SoundEffect.MIN_SAMPLE_RATE && (j[F++] = Y, j[F++] = Y, j[F++] = Y)), x
            }, "undefined" != typeof exports) {
            var RIFFWAVE = require("./riffwave").RIFFWAVE;
            exports.Params = Params, exports.generate = generate
        }
        var sfxCache = {},
            cachedSeeds = [],
            CACHE_MAX = 50;
    
        ! function(e) {
            if ("object" == typeof exports && "object" == typeof module) module.exports = e();
            else {
                if ("function" == typeof define && define.amd) return define([], e);
                this.CodeMirror = e()
            }
        }(function() {
            "use strict";

            function e(r, n) {
                if (!(this instanceof e)) return new e(r, n);
                this.options = n = n || {};
                for (var i in no) n.hasOwnProperty(i) || (n[i] = no[i]);
                d(n);
                var o = n.value;
                "string" == typeof o && (o = new No(o, n.mode)), this.doc = o;
                var l = this.display = new t(r, o);
                l.wrapper.CodeMirror = this, c(this), s(this), n.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap"), n.autofocus && !Ei && ft(this), this.state = {
                    keyMaps: [],
                    overlays: [],
                    modeGen: 0,
                    overwrite: !1,
                    focused: !1,
                    suppressEdits: !1,
                    pasteIncoming: !1,
                    cutIncoming: !1,
                    draggingText: !1,
                    highlight: new Bn
                }, bi && setTimeout(jn(ct, this, !0), 20), pt(this);
                var a = this;
                je(this, function() {
                    a.curOp.forceUpdate = !0, sn(a, o), n.autofocus && !Ei || ri() == l.input ? setTimeout(jn(Et, a), 20) : zt(a);
                    for (var e in io) io.hasOwnProperty(e) && io[e](a, n[e], oo);
                    for (var t = 0; t < uo.length; ++t) uo[t](a)
                })
            }

            function t(e, t) {
                var r = this,
                    n = r.input = Qn("textarea", null, null, "position: absolute; padding: 0; width: 1px; height: 1em; outline: none");
                ki ? n.style.width = "1000px" : n.setAttribute("wrap", "off"), Ii && (n.style.border = "1px solid black"), n.setAttribute("autocorrect", "off"), n.setAttribute("autocapitalize", "off"), n.setAttribute("spellcheck", "false"), r.inputDiv = Qn("div", [n], null, "overflow: hidden; position: relative; width: 3px; height: 0px;"), r.scrollbarH = Qn("div", [Qn("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar"), r.scrollbarV = Qn("div", [Qn("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar"), r.scrollbarFiller = Qn("div", null, "CodeMirror-scrollbar-filler"), r.gutterFiller = Qn("div", null, "CodeMirror-gutter-filler"), r.lineDiv = Qn("div", null, "CodeMirror-code"), r.selectionDiv = Qn("div", null, null, "position: relative; z-index: 1"), r.cursorDiv = Qn("div", null, "CodeMirror-cursors"), r.measure = Qn("div", null, "CodeMirror-measure"), r.lineMeasure = Qn("div", null, "CodeMirror-measure"), r.lineSpace = Qn("div", [r.measure, r.lineMeasure, r.selectionDiv, r.cursorDiv, r.lineDiv], null, "position: relative; outline: none"), r.mover = Qn("div", [Qn("div", [r.lineSpace], "CodeMirror-lines")], null, "position: relative"), r.sizer = Qn("div", [r.mover], "CodeMirror-sizer"), r.heightForcer = Qn("div", null, null, "position: absolute; height: " + Fo + "px; width: 1px;"), r.gutters = Qn("div", null, "CodeMirror-gutters"), r.lineGutter = null, r.scroller = Qn("div", [r.sizer, r.heightForcer, r.gutters], "CodeMirror-scroll"), r.scroller.setAttribute("tabIndex", "-1"), r.wrapper = Qn("div", [r.inputDiv, r.scrollbarH, r.scrollbarV, r.scrollbarFiller, r.gutterFiller, r.scroller], "CodeMirror"), xi && (r.gutters.style.zIndex = -1, r.scroller.style.paddingRight = 0), Ii && (n.style.width = "0px"), ki || (r.scroller.draggable = !0), Hi && (r.inputDiv.style.height = "1px", r.inputDiv.style.position = "absolute"), xi && (r.scrollbarH.style.minHeight = r.scrollbarV.style.minWidth = "18px"), e.appendChild ? e.appendChild(r.wrapper) : e(r.wrapper), r.viewFrom = r.viewTo = t.first, r.view = [], r.externalMeasured = null, r.viewOffset = 0, r.lastSizeC = 0, r.updateLineNumbers = null, r.lineNumWidth = r.lineNumInnerWidth = r.lineNumChars = null, r.prevInput = "", r.alignWidgets = !1, r.pollingFast = !1, r.poll = new Bn, r.cachedCharWidth = r.cachedTextHeight = r.cachedPaddingH = null, r.inaccurateSelection = !1, r.maxLine = null, r.maxLineLength = 0, r.maxLineChanged = !1, r.wheelDX = r.wheelDY = r.wheelStartX = r.wheelStartY = null, r.shift = !1
            }

            function r(t) {
                t.doc.mode = e.getMode(t.options, t.doc.modeOption), n(t)
            }

            function n(e) {
                e.doc.iter(function(e) {
                    e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null)
                }), e.doc.frontier = e.doc.first, ve(e, 100), e.state.modeGen++, e.curOp && et(e)
            }

            function i(e) {
                e.options.lineWrapping ? (e.display.wrapper.className += " CodeMirror-wrap", e.display.sizer.style.minWidth = "") : (e.display.wrapper.className = e.display.wrapper.className.replace(" CodeMirror-wrap", ""), h(e)), l(e), et(e), De(e), setTimeout(function() {
                    g(e)
                }, 100)
            }

            function o(e) {
                var t = Ke(e.display),
                    r = e.options.lineWrapping,
                    n = r && Math.max(5, e.display.scroller.clientWidth / _e(e.display) - 3);
                return function(i) {
                    if (Rr(e.doc, i)) return 0;
                    var o = 0;
                    if (i.widgets)
                        for (var l = 0; l < i.widgets.length; l++) i.widgets[l].height && (o += i.widgets[l].height);
                    return r ? o + (Math.ceil(i.text.length / n) || 1) * t : o + t
                }
            }

            function l(e) {
                var t = e.doc,
                    r = o(e);
                t.iter(function(e) {
                    var t = r(e);
                    t != e.height && hn(e, t)
                })
            }

            function a(e) {
                var t = go[e.options.keyMap],
                    r = t.style;
                e.display.wrapper.className = e.display.wrapper.className.replace(/\s*cm-keymap-\S+/g, "") + (r ? " cm-keymap-" + r : "")
            }

            function s(e) {
                e.display.wrapper.className = e.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + e.options.theme.replace(/(^|\s)\s*/g, " cm-s-"), De(e)
            }

            function u(e) {
                c(e), et(e), setTimeout(function() {
                    m(e)
                }, 20)
            }

            function c(e) {
                var t = e.display.gutters,
                    r = e.options.gutters;
                Jn(t);
                for (var n = 0; n < r.length; ++n) {
                    var i = r[n],
                        o = t.appendChild(Qn("div", null, "CodeMirror-gutter " + i));
                    "CodeMirror-linenumbers" == i && (e.display.lineGutter = o, o.style.width = (e.display.lineNumWidth || 1) + "px")
                }
                t.style.display = n ? "" : "none";
                var l = t.offsetWidth;
                e.display.sizer.style.marginLeft = l + "px", n && (e.display.scrollbarH.style.left = e.options.fixedGutter ? l + "px" : 0)
            }

            function f(e) {
                if (0 == e.height) return 0;
                for (var t, r = e.text.length, n = e; t = Hr(n);) {
                    var i = t.find(0, !0);
                    n = i.from.line, r += i.from.ch - i.to.ch
                }
                for (n = e; t = Ar(n);) {
                    var i = t.find(0, !0);
                    r -= n.text.length - i.from.ch, n = i.to.line, r += n.text.length - i.to.ch
                }
                return r
            }

            function h(e) {
                var t = e.display,
                    r = e.doc;
                t.maxLine = un(r, r.first), t.maxLineLength = f(t.maxLine), t.maxLineChanged = !0, r.iter(function(e) {
                    var r = f(e);
                    r > t.maxLineLength && (t.maxLineLength = r, t.maxLine = e)
                })
            }

            function d(e) {
                var t = Kn(e.gutters, "CodeMirror-linenumbers");
                t == -1 && e.lineNumbers ? e.gutters = e.gutters.concat(["CodeMirror-linenumbers"]) : t > -1 && !e.lineNumbers && (e.gutters = e.gutters.slice(0), e.gutters.splice(t, 1))
            }

            function p(e) {
                var t = e.display.scroller;
                return {
                    clientHeight: t.clientHeight,
                    barHeight: e.display.scrollbarV.clientHeight,
                    scrollWidth: t.scrollWidth,
                    clientWidth: t.clientWidth,
                    barWidth: e.display.scrollbarH.clientWidth,
                    docHeight: Math.round(e.doc.height + we(e.display))
                }
            }

            function g(e, t) {
                t || (t = p(e));
                var r = e.display,
                    n = t.docHeight + Fo,
                    i = t.scrollWidth > t.clientWidth,
                    o = n > t.clientHeight;
                if (o ? (r.scrollbarV.style.display = "block", r.scrollbarV.style.bottom = i ? ni(r.measure) + "px" : "0", r.scrollbarV.firstChild.style.height = Math.max(0, n - t.clientHeight + (t.barHeight || r.scrollbarV.clientHeight)) + "px") : (r.scrollbarV.style.display = "", r.scrollbarV.firstChild.style.height = "0"), i ? (r.scrollbarH.style.display = "block", r.scrollbarH.style.right = o ? ni(r.measure) + "px" : "0", r.scrollbarH.firstChild.style.width = t.scrollWidth - t.clientWidth + (t.barWidth || r.scrollbarH.clientWidth) + "px") : (r.scrollbarH.style.display = "", r.scrollbarH.firstChild.style.width = "0"), i && o ? (r.scrollbarFiller.style.display = "block", r.scrollbarFiller.style.height = r.scrollbarFiller.style.width = ni(r.measure) + "px") : r.scrollbarFiller.style.display = "", i && e.options.coverGutterNextToScrollbar && e.options.fixedGutter ? (r.gutterFiller.style.display = "block", r.gutterFiller.style.height = ni(r.measure) + "px", r.gutterFiller.style.width = r.gutters.offsetWidth + "px") : r.gutterFiller.style.display = "", Ai && 0 === ni(r.measure)) {
                    r.scrollbarV.style.minWidth = r.scrollbarH.style.minHeight = Wi ? "18px" : "12px";
                    var l = function(t) {
                        Dn(t) != r.scrollbarV && Dn(t) != r.scrollbarH && $e(e, mt)(t)
                    };
                    Eo(r.scrollbarV, "mousedown", l), Eo(r.scrollbarH, "mousedown", l)
                }
            }

            function v(e, t, r) {
                var n = r && null != r.top ? r.top : e.scroller.scrollTop;
                n = Math.floor(n - xe(e));
                var i = r && null != r.bottom ? r.bottom : n + e.wrapper.clientHeight,
                    o = pn(t, n),
                    l = pn(t, i);
                if (r && r.ensure) {
                    var a = r.ensure.from.line,
                        s = r.ensure.to.line;
                    if (a < o) return {
                        from: a,
                        to: pn(t, gn(un(t, a)) + e.wrapper.clientHeight)
                    };
                    if (Math.min(s, t.lastLine()) >= l) return {
                        from: pn(t, gn(un(t, s)) - e.wrapper.clientHeight),
                        to: s
                    }
                }
                return {
                    from: o,
                    to: l
                }
            }

            function m(e) {
                var t = e.display,
                    r = t.view;
                if (t.alignWidgets || t.gutters.firstChild && e.options.fixedGutter) {
                    for (var n = x(t) - t.scroller.scrollLeft + e.doc.scrollLeft, i = t.gutters.offsetWidth, o = n + "px", l = 0; l < r.length; l++)
                        if (!r[l].hidden) {
                            e.options.fixedGutter && r[l].gutter && (r[l].gutter.style.left = o);
                            var a = r[l].alignable;
                            if (a)
                                for (var s = 0; s < a.length; s++) a[s].style.left = o
                        }
                    e.options.fixedGutter && (t.gutters.style.left = n + i + "px")
                }
            }

            function y(e) {
                if (!e.options.lineNumbers) return !1;
                var t = e.doc,
                    r = b(e.options, t.first + t.size - 1),
                    n = e.display;
                if (r.length != n.lineNumChars) {
                    var i = n.measure.appendChild(Qn("div", [Qn("div", r)], "CodeMirror-linenumber CodeMirror-gutter-elt")),
                        o = i.firstChild.offsetWidth,
                        l = i.offsetWidth - o;
                    n.lineGutter.style.width = "", n.lineNumInnerWidth = Math.max(o, n.lineGutter.offsetWidth - l), n.lineNumWidth = n.lineNumInnerWidth + l, n.lineNumChars = n.lineNumInnerWidth ? r.length : -1, n.lineGutter.style.width = n.lineNumWidth + "px";
                    var a = n.gutters.offsetWidth;
                    return n.scrollbarH.style.left = e.options.fixedGutter ? a + "px" : 0, n.sizer.style.marginLeft = a + "px", !0
                }
                return !1
            }

            function b(e, t) {
                return String(e.lineNumberFormatter(t + e.firstLineNumber))
            }

            function x(e) {
                return e.scroller.getBoundingClientRect().left - e.sizer.getBoundingClientRect().left
            }

            function w(e, t, r) {
                for (var n, i = e.display.viewFrom, o = e.display.viewTo, l = v(e.display, e.doc, t), a = !0;; a = !1) {
                    var s = e.display.scroller.clientWidth;
                    if (!C(e, l, r)) break;
                    n = !0, e.display.maxLineChanged && !e.options.lineWrapping && L(e);
                    var u = p(e);
                    if (he(e), S(e, u), g(e, u), a && e.options.lineWrapping && s != e.display.scroller.clientWidth) r = !0;
                    else if (r = !1, t && null != t.top && (t = {
                            top: Math.min(u.docHeight - Fo - u.clientHeight, t.top)
                        }), l = v(e.display, e.doc, t), l.from >= e.display.viewFrom && l.to <= e.display.viewTo) break
                }
                return e.display.updateLineNumbers = null, n && (En(e, "update", e), e.display.viewFrom == i && e.display.viewTo == o || En(e, "viewportChange", e, e.display.viewFrom, e.display.viewTo)), n
            }

            function C(e, t, r) {
                var n = e.display,
                    i = e.doc;
                if (!n.wrapper.offsetWidth) return void rt(e);
                if (!(!r && t.from >= n.viewFrom && t.to <= n.viewTo && 0 == lt(e))) {
                    y(e) && rt(e);
                    var o = T(e),
                        l = i.first + i.size,
                        a = Math.max(t.from - e.options.viewportMargin, i.first),
                        s = Math.min(l, t.to + e.options.viewportMargin);
                    n.viewFrom < a && a - n.viewFrom < 20 && (a = Math.max(i.first, n.viewFrom)), n.viewTo > s && n.viewTo - s < 20 && (s = Math.min(l, n.viewTo)), Vi && (a = Er(e.doc, a), s = zr(e.doc, s));
                    var u = a != n.viewFrom || s != n.viewTo || n.lastSizeC != n.wrapper.clientHeight;
                    ot(e, a, s), n.viewOffset = gn(un(e.doc, n.viewFrom)), e.display.mover.style.top = n.viewOffset + "px";
                    var c = lt(e);
                    if (u || 0 != c || r) {
                        var f = ri();
                        return c > 4 && (n.lineDiv.style.display = "none"), N(e, n.updateLineNumbers, o), c > 4 && (n.lineDiv.style.display = ""), f && ri() != f && f.offsetHeight && f.focus(), Jn(n.cursorDiv), Jn(n.selectionDiv), u && (n.lastSizeC = n.wrapper.clientHeight, ve(e, 400)), k(e), !0
                    }
                }
            }

            function L(e) {
                var t = e.display,
                    r = Me(e, t.maxLine, t.maxLine.text.length).left;
                t.maxLineChanged = !1;
                var n = Math.max(0, r + 3),
                    i = Math.max(0, t.sizer.offsetLeft + n + Fo - t.scroller.clientWidth);
                t.sizer.style.minWidth = n + "px", i < e.doc.scrollLeft && Mt(e, Math.min(t.scroller.scrollLeft, i), !0)
            }

            function S(e, t) {
                e.display.sizer.style.minHeight = e.display.heightForcer.style.top = t.docHeight + "px", e.display.gutters.style.height = Math.max(t.docHeight, t.clientHeight - Fo) + "px"
            }

            function k(e) {
                for (var t = e.display, r = t.lineDiv.offsetTop, n = 0; n < t.view.length; n++) {
                    var i, o = t.view[n];
                    if (!o.hidden) {
                        if (xi) {
                            var l = o.node.offsetTop + o.node.offsetHeight;
                            i = l - r, r = l
                        } else {
                            var a = o.node.getBoundingClientRect();
                            i = a.bottom - a.top
                        }
                        var s = o.line.height - i;
                        if (i < 2 && (i = Ke(t)), (s > .001 || s < -.001) && (hn(o.line, i), M(o.line), o.rest))
                            for (var u = 0; u < o.rest.length; u++) M(o.rest[u])
                    }
                }
            }

            function M(e) {
                if (e.widgets)
                    for (var t = 0; t < e.widgets.length; ++t) e.widgets[t].height = e.widgets[t].node.offsetHeight
            }

            function T(e) {
                for (var t = e.display, r = {}, n = {}, i = t.gutters.firstChild, o = 0; i; i = i.nextSibling, ++o) r[e.options.gutters[o]] = i.offsetLeft, n[e.options.gutters[o]] = i.offsetWidth;
                return {
                    fixedPos: x(t),
                    gutterTotalWidth: t.gutters.offsetWidth,
                    gutterLeft: r,
                    gutterWidth: n,
                    wrapperWidth: t.wrapper.clientWidth
                }
            }

            function N(e, t, r) {
                function n(t) {
                    var r = t.nextSibling;
                    return ki && zi && e.display.currentWheelTarget == t ? t.style.display = "none" : t.parentNode.removeChild(t), r
                }
                for (var i = e.display, o = e.options.lineNumbers, l = i.lineDiv, a = l.firstChild, s = i.view, u = i.viewFrom, c = 0; c < s.length; c++) {
                    var f = s[c];
                    if (f.hidden);
                    else if (f.node) {
                        for (; a != f.node;) a = n(a);
                        var h = o && null != t && t <= u && f.lineNumber;
                        f.changes && (Kn(f.changes, "gutter") > -1 && (h = !1), O(e, f, u, r)), h && (Jn(f.lineNumber), f.lineNumber.appendChild(document.createTextNode(b(e.options, u)))), a = f.node.nextSibling
                    } else {
                        var d = R(e, f, u, r);
                        l.insertBefore(d, a)
                    }
                    u += f.size
                }
                for (; a;) a = n(a)
            }

            function O(e, t, r, n) {
                for (var i = 0; i < t.changes.length; i++) {
                    var o = t.changes[i];
                    "text" == o ? D(e, t) : "gutter" == o ? E(e, t, r, n) : "class" == o ? I(t) : "widget" == o && z(t, n)
                }
                t.changes = null
            }

            function H(e) {
                return e.node == e.text && (e.node = Qn("div", null, null, "position: relative"), e.text.parentNode && e.text.parentNode.replaceChild(e.node, e.text), e.node.appendChild(e.text), xi && (e.node.style.zIndex = 2)), e.node
            }

            function A(e) {
                var t = e.bgClass ? e.bgClass + " " + (e.line.bgClass || "") : e.line.bgClass;
                if (t && (t += " CodeMirror-linebackground"), e.background) t ? e.background.className = t : (e.background.parentNode.removeChild(e.background), e.background = null);
                else if (t) {
                    var r = H(e);
                    e.background = r.insertBefore(Qn("div", null, t), r.firstChild)
                }
            }

            function W(e, t) {
                var r = e.display.externalMeasured;
                return r && r.line == t.line ? (e.display.externalMeasured = null, t.measure = r.measure, r.built) : $r(e, t)
            }

            function D(e, t) {
                var r = t.text.className,
                    n = W(e, t);
                t.text == t.node && (t.node = n.pre), t.text.parentNode.replaceChild(n.pre, t.text), t.text = n.pre, n.bgClass != t.bgClass || n.textClass != t.textClass ? (t.bgClass = n.bgClass, t.textClass = n.textClass, I(t)) : r && (t.text.className = r)
            }

            function I(e) {
                A(e), e.line.wrapClass ? H(e).className = e.line.wrapClass : e.node != e.text && (e.node.className = "");
                var t = e.textClass ? e.textClass + " " + (e.line.textClass || "") : e.line.textClass;
                e.text.className = t || ""
            }

            function E(e, t, r, n) {
                t.gutter && (t.node.removeChild(t.gutter), t.gutter = null);
                var i = t.line.gutterMarkers;
                if (e.options.lineNumbers || i) {
                    var o = H(t),
                        l = t.gutter = o.insertBefore(Qn("div", null, "CodeMirror-gutter-wrapper", "position: absolute; left: " + (e.options.fixedGutter ? n.fixedPos : -n.gutterTotalWidth) + "px"), t.text);
                    if (!e.options.lineNumbers || i && i["CodeMirror-linenumbers"] || (t.lineNumber = l.appendChild(Qn("div", b(e.options, r), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + n.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + e.display.lineNumInnerWidth + "px"))), i)
                        for (var a = 0; a < e.options.gutters.length; ++a) {
                            var s = e.options.gutters[a],
                                u = i.hasOwnProperty(s) && i[s];
                            u && l.appendChild(Qn("div", [u], "CodeMirror-gutter-elt", "left: " + n.gutterLeft[s] + "px; width: " + n.gutterWidth[s] + "px"))
                        }
                }
            }

            function z(e, t) {
                e.alignable && (e.alignable = null);
                for (var r, n = e.node.firstChild; n; n = r) {
                    var r = n.nextSibling;
                    "CodeMirror-linewidget" == n.className && e.node.removeChild(n)
                }
                P(e, t)
            }

            function R(e, t, r, n) {
                var i = W(e, t);
                return t.text = t.node = i.pre, i.bgClass && (t.bgClass = i.bgClass), i.textClass && (t.textClass = i.textClass), I(t), E(e, t, r, n), P(t, n), t.node
            }

            function P(e, t) {
                if (F(e.line, e, t, !0), e.rest)
                    for (var r = 0; r < e.rest.length; r++) F(e.rest[r], e, t, !1)
            }

            function F(e, t, r, n) {
                if (e.widgets)
                    for (var i = H(t), o = 0, l = e.widgets; o < l.length; ++o) {
                        var a = l[o],
                            s = Qn("div", [a.node], "CodeMirror-linewidget");
                        a.handleMouseEvents || (s.ignoreEvents = !0), B(a, s, t, r), n && a.above ? i.insertBefore(s, t.gutter || t.text) : i.appendChild(s), En(a, "redraw")
                    }
            }

            function B(e, t, r, n) {
                if (e.noHScroll) {
                    (r.alignable || (r.alignable = [])).push(t);
                    var i = n.wrapperWidth;
                    t.style.left = n.fixedPos + "px", e.coverGutter || (i -= n.gutterTotalWidth, t.style.paddingLeft = n.gutterTotalWidth + "px"), t.style.width = i + "px"
                }
                e.coverGutter && (t.style.zIndex = 5, t.style.position = "relative", e.noHScroll || (t.style.marginLeft = -n.gutterTotalWidth + "px"))
            }

            function G(e) {
                return Ui(e.line, e.ch)
            }

            function V(e, t) {
                return Ki(e, t) < 0 ? t : e
            }

            function U(e, t) {
                return Ki(e, t) < 0 ? e : t
            }

            function K(e, t) {
                this.ranges = e, this.primIndex = t
            }

            function _(e, t) {
                this.anchor = e, this.head = t
            }

            function X(e, t) {
                var r = e[t];
                e.sort(function(e, t) {
                    return Ki(e.from(), t.from())
                }), t = Kn(e, r);
                for (var n = 1; n < e.length; n++) {
                    var i = e[n],
                        o = e[n - 1];
                    if (Ki(o.to(), i.from()) >= 0) {
                        var l = U(o.from(), i.from()),
                            a = V(o.to(), i.to()),
                            s = o.empty() ? i.from() == i.head : o.from() == o.head;
                        n <= t && --t, e.splice(--n, 2, new _(s ? a : l, s ? l : a))
                    }
                }
                return new K(e, t)
            }

            function Y(e, t) {
                return new K([new _(e, t || e)], 0)
            }

            function j(e, t) {
                return Math.max(e.first, Math.min(t, e.first + e.size - 1))
            }

            function $(e, t) {
                if (t.line < e.first) return Ui(e.first, 0);
                var r = e.first + e.size - 1;
                return t.line > r ? Ui(r, un(e, r).text.length) : q(t, un(e, t.line).text.length)
            }

            function q(e, t) {
                var r = e.ch;
                return null == r || r > t ? Ui(e.line, t) : r < 0 ? Ui(e.line, 0) : e
            }

            function Z(e, t) {
                return t >= e.first && t < e.first + e.size
            }

            function Q(e, t) {
                for (var r = [], n = 0; n < t.length; n++) r[n] = $(e, t[n]);
                return r
            }

            function J(e, t, r, n) {
                if (e.cm && e.cm.display.shift || e.extend) {
                    var i = t.anchor;
                    if (n) {
                        var o = Ki(r, i) < 0;
                        o != Ki(n, i) < 0 ? (i = r, r = n) : o != Ki(r, n) < 0 && (r = n)
                    }
                    return new _(i, r)
                }
                return new _(n || r, r)
            }

            function ee(e, t, r, n) {
                le(e, new K([J(e, e.sel.primary(), t, r)], 0), n)
            }

            function te(e, t, r) {
                for (var n = [], i = 0; i < e.sel.ranges.length; i++) n[i] = J(e, e.sel.ranges[i], t[i], null);
                var o = X(n, e.sel.primIndex);
                le(e, o, r)
            }

            function re(e, t, r, n) {
                var i = e.sel.ranges.slice(0);
                i[t] = r, le(e, X(i, e.sel.primIndex), n)
            }

            function ne(e, t, r, n) {
                le(e, Y(t, r), n)
            }

            function ie(e, t) {
                var r = {
                    ranges: t.ranges,
                    update: function(t) {
                        this.ranges = [];
                        for (var r = 0; r < t.length; r++) this.ranges[r] = new _($(e, t[r].anchor), $(e, t[r].head))
                    }
                };
                return Ro(e, "beforeSelectionChange", e, r), e.cm && Ro(e.cm, "beforeSelectionChange", e.cm, r), r.ranges != t.ranges ? X(r.ranges, r.ranges.length - 1) : t
            }

            function oe(e, t, r) {
                var n = e.history.done,
                    i = Un(n);
                i && i.ranges ? (n[n.length - 1] = t, ae(e, t, r)) : le(e, t, r)
            }

            function le(e, t, r) {
                ae(e, t, r), Ln(e, e.sel, e.cm ? e.cm.curOp.id : NaN, r)
            }

            function ae(e, t, r) {
                (Pn(e, "beforeSelectionChange") || e.cm && Pn(e.cm, "beforeSelectionChange")) && (t = ie(e, t));
                var n = Ki(t.primary().head, e.sel.primary().head) < 0 ? -1 : 1;
                se(e, ce(e, t, n, !0)), r && r.scroll === !1 || !e.cm || rr(e.cm)
            }

            function se(e, t) {
                t.equals(e.sel) || (e.sel = t, e.cm && (e.cm.curOp.updateInput = e.cm.curOp.selectionChanged = e.cm.curOp.cursorActivity = !0), En(e, "cursorActivity", e))
            }

            function ue(e) {
                se(e, ce(e, e.sel, null, !1), Go)
            }

            function ce(e, t, r, n) {
                for (var i, o = 0; o < t.ranges.length; o++) {
                    var l = t.ranges[o],
                        a = fe(e, l.anchor, r, n),
                        s = fe(e, l.head, r, n);
                    (i || a != l.anchor || s != l.head) && (i || (i = t.ranges.slice(0, o)), i[o] = new _(a, s))
                }
                return i ? X(i, t.primIndex) : t
            }

            function fe(e, t, r, n) {
                var i = !1,
                    o = t,
                    l = r || 1;
                e.cantEdit = !1;
                e: for (;;) {
                    var a = un(e, o.line);
                    if (a.markedSpans)
                        for (var s = 0; s < a.markedSpans.length; ++s) {
                            var u = a.markedSpans[s],
                                c = u.marker;
                            if ((null == u.from || (c.inclusiveLeft ? u.from <= o.ch : u.from < o.ch)) && (null == u.to || (c.inclusiveRight ? u.to >= o.ch : u.to > o.ch))) {
                                if (n && (Ro(c, "beforeCursorEnter"), c.explicitlyCleared)) {
                                    if (a.markedSpans) {
                                        --s;
                                        continue
                                    }
                                    break
                                }
                                if (!c.atomic) continue;
                                var f = c.find(l < 0 ? -1 : 1);
                                if (0 == Ki(f, o) && (f.ch += l, f.ch < 0 ? f = f.line > e.first ? $(e, Ui(f.line - 1)) : null : f.ch > a.text.length && (f = f.line < e.first + e.size - 1 ? Ui(f.line + 1, 0) : null), !f)) {
                                    if (i) return n ? (e.cantEdit = !0, Ui(e.first, 0)) : fe(e, t, r, !0);
                                    i = !0, f = t, l = -l
                                }
                                o = f;
                                continue e
                            }
                        }
                    return o
                }
            }

            function he(e) {
                for (var t = e.display, r = e.doc, n = document.createDocumentFragment(), i = document.createDocumentFragment(), o = 0; o < r.sel.ranges.length; o++) {
                    var l = r.sel.ranges[o],
                        a = l.empty();
                    (a || e.options.showCursorWhenSelecting) && de(e, l, n), a || pe(e, l, i)
                }
                if (e.options.moveInputWithCursor) {
                    var s = Fe(e, r.sel.primary().head, "div"),
                        u = t.wrapper.getBoundingClientRect(),
                        c = t.lineDiv.getBoundingClientRect(),
                        f = Math.max(0, Math.min(t.wrapper.clientHeight - 10, s.top + c.top - u.top)),
                        h = Math.max(0, Math.min(t.wrapper.clientWidth - 10, s.left + c.left - u.left));
                    t.inputDiv.style.top = f + "px", t.inputDiv.style.left = h + "px"
                }
                ei(t.cursorDiv, n), ei(t.selectionDiv, i)
            }

            function de(e, t, r) {
                var n = Fe(e, t.head, "div"),
                    i = r.appendChild(Qn("div", " ", "CodeMirror-cursor"));
                if (i.style.left = n.left + "px", i.style.top = n.top + "px", i.style.height = Math.max(0, n.bottom - n.top) * e.options.cursorHeight + "px", n.other) {
                    var o = r.appendChild(Qn("div", " ", "CodeMirror-cursor CodeMirror-secondarycursor"));
                    o.style.display = "", o.style.left = n.other.left + "px", o.style.top = n.other.top + "px", o.style.height = .85 * (n.other.bottom - n.other.top) + "px"
                }
            }

            function pe(e, t, r) {
                function n(e, t, r, n) {
                    t < 0 && (t = 0), a.appendChild(Qn("div", null, "CodeMirror-selected", "position: absolute; left: " + e + "px; top: " + t + "px; width: " + (null == r ? c - e : r) + "px; height: " + (n - t) + "px"))
                }

                function i(t, r, i) {
                    function o(r, n) {
                        return Pe(e, Ui(t, r), "div", f, n)
                    }
                    var a, s, f = un(l, t),
                        h = f.text.length;
                    return li(vn(f), r || 0, null == i ? h : i, function(e, t, l) {
                        var f, d, p, g = o(e, "left");
                        if (e == t) f = g, d = p = g.left;
                        else {
                            if (f = o(t - 1, "right"), "rtl" == l) {
                                var v = g;
                                g = f, f = v
                            }
                            d = g.left, p = f.right
                        }
                        null == r && 0 == e && (d = u), f.top - g.top > 3 && (n(d, g.top, null, g.bottom), d = u, g.bottom < f.top && n(d, g.bottom, null, f.top)), null == i && t == h && (p = c), (!a || g.top < a.top || g.top == a.top && g.left < a.left) && (a = g), (!s || f.bottom > s.bottom || f.bottom == s.bottom && f.right > s.right) && (s = f), d < u + 1 && (d = u), n(d, f.top, p - d, f.bottom)
                    }), {
                        start: a,
                        end: s
                    }
                }
                var o = e.display,
                    l = e.doc,
                    a = document.createDocumentFragment(),
                    s = Ce(e.display),
                    u = s.left,
                    c = o.lineSpace.offsetWidth - s.right,
                    f = t.from(),
                    h = t.to();
                if (f.line == h.line) i(f.line, f.ch, h.ch);
                else {
                    var d = un(l, f.line),
                        p = un(l, h.line),
                        g = Dr(d) == Dr(p),
                        v = i(f.line, f.ch, g ? d.text.length + 1 : null).end,
                        m = i(h.line, g ? 0 : null, h.ch).start;
                    g && (v.top < m.top - 2 ? (n(v.right, v.top, null, v.bottom), n(u, m.top, m.left, m.bottom)) : n(v.right, v.top, m.left - v.right, v.bottom)), v.bottom < m.top && n(u, v.bottom, null, m.top)
                }
                r.appendChild(a)
            }

            function ge(e) {
                if (e.state.focused) {
                    var t = e.display;
                    clearInterval(t.blinker);
                    var r = !0;
                    t.cursorDiv.style.visibility = "", e.options.cursorBlinkRate > 0 && (t.blinker = setInterval(function() {
                        t.cursorDiv.style.visibility = (r = !r) ? "" : "hidden"
                    }, e.options.cursorBlinkRate))
                }
            }

            function ve(e, t) {
                e.doc.mode.startState && e.doc.frontier < e.display.viewTo && e.state.highlight.set(t, jn(me, e))
            }

            function me(e) {
                var t = e.doc;
                if (t.frontier < t.first && (t.frontier = t.first), !(t.frontier >= e.display.viewTo)) {
                    var r = +new Date + e.options.workTime,
                        n = fo(t.mode, be(e, t.frontier));
                    je(e, function() {
                        t.iter(t.frontier, Math.min(t.first + t.size, e.display.viewTo + 500), function(i) {
                            if (t.frontier >= e.display.viewFrom) {
                                var o = i.styles;
                                i.styles = _r(e, i, n, !0);
                                for (var l = !o || o.length != i.styles.length, a = 0; !l && a < o.length; ++a) l = o[a] != i.styles[a];
                                l && tt(e, t.frontier, "text"), i.stateAfter = fo(t.mode, n)
                            } else Yr(e, i.text, n), i.stateAfter = t.frontier % 5 == 0 ? fo(t.mode, n) : null;
                            if (++t.frontier, +new Date > r) return ve(e, e.options.workDelay), !0
                        })
                    })
                }
            }

            function ye(e, t, r) {
                for (var n, i, o = e.doc, l = r ? -1 : t - (e.doc.mode.innerMode ? 1e3 : 100), a = t; a > l; --a) {
                    if (a <= o.first) return o.first;
                    var s = un(o, a - 1);
                    if (s.stateAfter && (!r || a <= o.frontier)) return a;
                    var u = Ko(s.text, null, e.options.tabSize);
                    (null == i || n > u) && (i = a - 1, n = u)
                }
                return i
            }

            function be(e, t, r) {
                var n = e.doc,
                    i = e.display;
                if (!n.mode.startState) return !0;
                var o = ye(e, t, r),
                    l = o > n.first && un(n, o - 1).stateAfter;
                return l = l ? fo(n.mode, l) : ho(n.mode), n.iter(o, t, function(r) {
                    Yr(e, r.text, l);
                    var a = o == t - 1 || o % 5 == 0 || o >= i.viewFrom && o < i.viewTo;
                    r.stateAfter = a ? fo(n.mode, l) : null, ++o
                }), r && (n.frontier = o), l
            }

            function xe(e) {
                return e.lineSpace.offsetTop
            }

            function we(e) {
                return e.mover.offsetHeight - e.lineSpace.offsetHeight
            }

            function Ce(e) {
                if (e.cachedPaddingH) return e.cachedPaddingH;
                var t = ei(e.measure, Qn("pre", "x")),
                    r = window.getComputedStyle ? window.getComputedStyle(t) : t.currentStyle;
                return e.cachedPaddingH = {
                    left: parseInt(r.paddingLeft),
                    right: parseInt(r.paddingRight)
                }
            }

            function Le(e, t, r) {
                var n = e.options.lineWrapping,
                    i = n && e.display.scroller.clientWidth;
                if (!t.measure.heights || n && t.measure.width != i) {
                    var o = t.measure.heights = [];
                    if (n) {
                        t.measure.width = i;
                        for (var l = t.text.firstChild.getClientRects(), a = 0; a < l.length - 1; a++) {
                            var s = l[a],
                                u = l[a + 1];
                            Math.abs(s.bottom - u.bottom) > 2 && o.push((s.bottom + u.top) / 2 - r.top)
                        }
                    }
                    o.push(r.bottom - r.top)
                }
            }

            function Se(e, t, r) {
                if (e.line == t) return {
                    map: e.measure.map,
                    cache: e.measure.cache
                };
                for (var n = 0; n < e.rest.length; n++)
                    if (e.rest[n] == t) return {
                        map: e.measure.maps[n],
                        cache: e.measure.caches[n]
                    };
                for (var n = 0; n < e.rest.length; n++)
                    if (dn(e.rest[n]) > r) return {
                        map: e.measure.maps[n],
                        cache: e.measure.caches[n],
                        before: !0
                    }
            }

            function ke(e, t) {
                t = Dr(t);
                var r = dn(t),
                    n = e.display.externalMeasured = new Qe(e.doc, t, r);
                n.lineN = r;
                var i = n.built = $r(e, n);
                return n.text = i.pre, ei(e.display.lineMeasure, i.pre), n
            }

            function Me(e, t, r, n) {
                return Oe(e, Ne(e, t), r, n)
            }

            function Te(e, t) {
                if (t >= e.display.viewFrom && t < e.display.viewTo) return e.display.view[nt(e, t)];
                var r = e.display.externalMeasured;
                return r && t >= r.lineN && t < r.lineN + r.size ? r : void 0
            }

            function Ne(e, t) {
                var r = dn(t),
                    n = Te(e, r);
                n && !n.text ? n = null : n && n.changes && O(e, n, r, T(e)), n || (n = ke(e, t));
                var i = Se(n, t, r);
                return {
                    line: t,
                    view: n,
                    rect: null,
                    map: i.map,
                    cache: i.cache,
                    before: i.before,
                    hasHeights: !1
                }
            }

            function Oe(e, t, r, n) {
                t.before && (r = -1);
                var i, o = r + (n || "");
                return t.cache.hasOwnProperty(o) ? i = t.cache[o] : (t.rect || (t.rect = t.view.text.getBoundingClientRect()), t.hasHeights || (Le(e, t.view, t.rect), t.hasHeights = !0), i = He(e, t, r, n), i.bogus || (t.cache[o] = i)), {
                    left: i.left,
                    right: i.right,
                    top: i.top,
                    bottom: i.bottom
                }
            }

            function He(e, t, r, n) {
                for (var i, o, l, a, s = t.map, u = 0; u < s.length; u += 3) {
                    var c = s[u],
                        f = s[u + 1];
                    if (r < c ? (o = 0, l = 1, a = "left") : r < f ? (o = r - c, l = o + 1) : (u == s.length - 3 || r == f && s[u + 3] > r) && (l = f - c, o = l - 1, r >= f && (a = "right")), null != o) {
                        if (i = s[u + 2], c == f && n == (i.insertLeft ? "left" : "right") && (a = n), "left" == n && 0 == o)
                            for (; u && s[u - 2] == s[u - 3] && s[u - 1].insertLeft;) i = s[(u -= 3) + 2], a = "left";
                        if ("right" == n && o == f - c)
                            for (; u < s.length - 3 && s[u + 3] == s[u + 4] && !s[u + 5].insertLeft;) i = s[(u += 3) + 2], a = "right";
                        break
                    }
                }
                var h;
                if (3 == i.nodeType) {
                    for (; o && qn(t.line.text.charAt(c + o));) --o;
                    for (; c + l < f && qn(t.line.text.charAt(c + l));) ++l;
                    if (wi && 0 == o && l == f - c) h = i.parentNode.getBoundingClientRect();
                    else if (Si && e.options.lineWrapping) {
                        var d = Yo(i, o, l).getClientRects();
                        h = d.length ? d["right" == n ? d.length - 1 : 0] : ji
                    } else h = Yo(i, o, l).getBoundingClientRect()
                } else {
                    o > 0 && (a = n = "right");
                    var d;
                    h = e.options.lineWrapping && (d = i.getClientRects()).length > 1 ? d["right" == n ? d.length - 1 : 0] : i.getBoundingClientRect()
                }
                if (wi && !o && (!h || !h.left && !h.right)) {
                    var p = i.parentNode.getClientRects()[0];
                    h = p ? {
                        left: p.left,
                        right: p.left + _e(e.display),
                        top: p.top,
                        bottom: p.bottom
                    } : ji
                }
                for (var g, v = (h.bottom + h.top) / 2 - t.rect.top, m = t.view.measure.heights, u = 0; u < m.length - 1 && !(v < m[u]); u++);
                g = u ? m[u - 1] : 0, v = m[u];
                var y = {
                    left: ("right" == a ? h.right : h.left) - t.rect.left,
                    right: ("left" == a ? h.left : h.right) - t.rect.left,
                    top: g,
                    bottom: v
                };
                return h.left || h.right || (y.bogus = !0), y
            }

            function Ae(e) {
                if (e.measure && (e.measure.cache = {}, e.measure.heights = null, e.rest))
                    for (var t = 0; t < e.rest.length; t++) e.measure.caches[t] = {}
            }

            function We(e) {
                e.display.externalMeasure = null, Jn(e.display.lineMeasure);
                for (var t = 0; t < e.display.view.length; t++) Ae(e.display.view[t])
            }

            function De(e) {
                We(e), e.display.cachedCharWidth = e.display.cachedTextHeight = e.display.cachedPaddingH = null, e.options.lineWrapping || (e.display.maxLineChanged = !0), e.display.lineNumChars = null
            }

            function Ie() {
                return window.pageXOffset || (document.documentElement || document.body).scrollLeft
            }

            function Ee() {
                return window.pageYOffset || (document.documentElement || document.body).scrollTop
            }

            function ze(e, t, r, n) {
                if (t.widgets)
                    for (var i = 0; i < t.widgets.length; ++i)
                        if (t.widgets[i].above) {
                            var o = Br(t.widgets[i]);
                            r.top += o, r.bottom += o
                        }
                if ("line" == n) return r;
                n || (n = "local");
                var l = gn(t);
                if ("local" == n ? l += xe(e.display) : l -= e.display.viewOffset, "page" == n || "window" == n) {
                    var a = e.display.lineSpace.getBoundingClientRect();
                    l += a.top + ("window" == n ? 0 : Ee());
                    var s = a.left + ("window" == n ? 0 : Ie());
                    r.left += s, r.right += s
                }
                return r.top += l, r.bottom += l, r
            }

            function Re(e, t, r) {
                if ("div" == r) return t;
                var n = t.left,
                    i = t.top;
                if ("page" == r) n -= Ie(), i -= Ee();
                else if ("local" == r || !r) {
                    var o = e.display.sizer.getBoundingClientRect();
                    n += o.left, i += o.top
                }
                var l = e.display.lineSpace.getBoundingClientRect();
                return {
                    left: n - l.left,
                    top: i - l.top
                }
            }

            function Pe(e, t, r, n, i) {
                return n || (n = un(e.doc, t.line)), ze(e, n, Me(e, n, t.ch, i), r)
            }

            function Fe(e, t, r, n, i) {
                function o(t, o) {
                    var l = Oe(e, i, t, o ? "right" : "left");
                    return o ? l.left = l.right : l.right = l.left, ze(e, n, l, r)
                }

                function l(e, t) {
                    var r = a[t],
                        n = r.level % 2;
                    return e == ai(r) && t && r.level < a[t - 1].level ? (r = a[--t], e = si(r) - (r.level % 2 ? 0 : 1), n = !0) : e == si(r) && t < a.length - 1 && r.level < a[t + 1].level && (r = a[++t], e = ai(r) - r.level % 2, n = !1), n && e == r.to && e > r.from ? o(e - 1) : o(e, n)
                }
                n = n || un(e.doc, t.line), i || (i = Ne(e, n));
                var a = vn(n),
                    s = t.ch;
                if (!a) return o(s);
                var u = pi(a, s),
                    c = l(s, u);
                return null != ll && (c.other = l(s, ll)), c
            }

            function Be(e, t) {
                var r = 0,
                    t = $(e.doc, t);
                e.options.lineWrapping || (r = _e(e.display) * t.ch);
                var n = un(e.doc, t.line),
                    i = gn(n) + xe(e.display);
                return {
                    left: r,
                    right: r,
                    top: i,
                    bottom: i + n.height
                }
            }

            function Ge(e, t, r, n) {
                var i = Ui(e, t);
                return i.xRel = n, r && (i.outside = !0), i
            }

            function Ve(e, t, r) {
                var n = e.doc;
                if (r += e.display.viewOffset, r < 0) return Ge(n.first, 0, !0, -1);
                var i = pn(n, r),
                    o = n.first + n.size - 1;
                if (i > o) return Ge(n.first + n.size - 1, un(n, o).text.length, !0, 1);
                t < 0 && (t = 0);
                for (var l = un(n, i);;) {
                    var a = Ue(e, l, i, t, r),
                        s = Ar(l),
                        u = s && s.find(0, !0);
                    if (!s || !(a.ch > u.from.ch || a.ch == u.from.ch && a.xRel > 0)) return a;
                    i = dn(l = u.to.line)
                }
            }

            function Ue(e, t, r, n, i) {
                function o(n) {
                    var i = Fe(e, Ui(r, n), "line", t, u);
                    return a = !0, l > i.bottom ? i.left - s : l < i.top ? i.left + s : (a = !1, i.left)
                }
                var l = i - gn(t),
                    a = !1,
                    s = 2 * e.display.wrapper.clientWidth,
                    u = Ne(e, t),
                    c = vn(t),
                    f = t.text.length,
                    h = ui(t),
                    d = ci(t),
                    p = o(h),
                    g = a,
                    v = o(d),
                    m = a;
                if (n > v) return Ge(r, d, m, 1);
                for (;;) {
                    if (c ? d == h || d == vi(t, h, 1) : d - h <= 1) {
                        for (var y = n < p || n - p <= v - n ? h : d, b = n - (y == h ? p : v); qn(t.text.charAt(y));) ++y;
                        var x = Ge(r, y, y == h ? g : m, b < -1 ? -1 : b > 1 ? 1 : 0);
                        return x
                    }
                    var w = Math.ceil(f / 2),
                        C = h + w;
                    if (c) {
                        C = h;
                        for (var L = 0; L < w; ++L) C = vi(t, C, 1)
                    }
                    var S = o(C);
                    S > n ? (d = C, v = S, (m = a) && (v += 1e3), f = w) : (h = C, p = S, g = a, f -= w)
                }
            }

            function Ke(e) {
                if (null != e.cachedTextHeight) return e.cachedTextHeight;
                if (null == _i) {
                    _i = Qn("pre");
                    for (var t = 0; t < 49; ++t) _i.appendChild(document.createTextNode("x")), _i.appendChild(Qn("br"));
                    _i.appendChild(document.createTextNode("x"))
                }
                ei(e.measure, _i);
                var r = _i.offsetHeight / 50;
                return r > 3 && (e.cachedTextHeight = r), Jn(e.measure), r || 1
            }

            function _e(e) {
                if (null != e.cachedCharWidth) return e.cachedCharWidth;
                var t = Qn("span", "xxxxxxxxxx"),
                    r = Qn("pre", [t]);
                ei(e.measure, r);
                var n = t.getBoundingClientRect(),
                    i = (n.right - n.left) / 10;
                return i > 2 && (e.cachedCharWidth = i), i || 10
            }

            function Xe(e) {
                e.curOp = {
                    viewChanged: !1,
                    startHeight: e.doc.height,
                    forceUpdate: !1,
                    updateInput: null,
                    typing: !1,
                    changeObjs: null,
                    cursorActivity: !1,
                    selectionChanged: !1,
                    updateMaxLine: !1,
                    scrollLeft: null,
                    scrollTop: null,
                    scrollToPos: null,
                    id: ++$i
                }, Po++ || (Ao = [])
            }

            function Ye(e) {
                var t = e.curOp,
                    r = e.doc,
                    n = e.display;
                if (e.curOp = null, t.updateMaxLine && h(e), t.viewChanged || t.forceUpdate || null != t.scrollTop || t.scrollToPos && (t.scrollToPos.from.line < n.viewFrom || t.scrollToPos.to.line >= n.viewTo) || n.maxLineChanged && e.options.lineWrapping) {
                    var i = w(e, {
                        top: t.scrollTop,
                        ensure: t.scrollToPos
                    }, t.forceUpdate);
                    e.display.scroller.offsetHeight && (e.doc.scrollTop = e.display.scroller.scrollTop)
                }
                if (!i && t.selectionChanged && he(e), i || t.startHeight == e.doc.height || g(e), null != t.scrollTop && n.scroller.scrollTop != t.scrollTop) {
                    var o = Math.max(0, Math.min(n.scroller.scrollHeight - n.scroller.clientHeight, t.scrollTop));
                    n.scroller.scrollTop = n.scrollbarV.scrollTop = r.scrollTop = o
                }
                if (null != t.scrollLeft && n.scroller.scrollLeft != t.scrollLeft) {
                    var l = Math.max(0, Math.min(n.scroller.scrollWidth - n.scroller.clientWidth, t.scrollLeft));
                    n.scroller.scrollLeft = n.scrollbarH.scrollLeft = r.scrollLeft = l, m(e)
                }
                if (t.scrollToPos) {
                    var a = Qt(e, $(e.doc, t.scrollToPos.from), $(e.doc, t.scrollToPos.to), t.scrollToPos.margin);
                    t.scrollToPos.isCursor && e.state.focused && Zt(e, a)
                }
                t.selectionChanged && ge(e), e.state.focused && t.updateInput && ct(e, t.typing);
                var s = t.maybeHiddenMarkers,
                    u = t.maybeUnhiddenMarkers;
                if (s)
                    for (var c = 0; c < s.length; ++c) s[c].lines.length || Ro(s[c], "hide");
                if (u)
                    for (var c = 0; c < u.length; ++c) u[c].lines.length && Ro(u[c], "unhide");
                var f;
                if (--Po || (f = Ao, Ao = null), t.changeObjs) {
                    for (var c = 0; c < t.changeObjs.length; c++) Ro(e, "change", e, t.changeObjs[c]);
                    Ro(e, "changes", e, t.changeObjs)
                }
                if (t.cursorActivity && Ro(e, "cursorActivity", e), f)
                    for (var c = 0; c < f.length; ++c) f[c]()
            }

            function je(e, t) {
                if (e.curOp) return t();
                Xe(e);
                try {
                    return t()
                } finally {
                    Ye(e)
                }
            }

            function $e(e, t) {
                return function() {
                    if (e.curOp) return t.apply(e, arguments);
                    Xe(e);
                    try {
                        return t.apply(e, arguments)
                    } finally {
                        Ye(e)
                    }
                }
            }

            function qe(e) {
                return function() {
                    if (this.curOp) return e.apply(this, arguments);
                    Xe(this);
                    try {
                        return e.apply(this, arguments)
                    } finally {
                        Ye(this)
                    }
                }
            }

            function Ze(e) {
                return function() {
                    var t = this.cm;
                    if (!t || t.curOp) return e.apply(this, arguments);
                    Xe(t);
                    try {
                        return e.apply(this, arguments)
                    } finally {
                        Ye(t)
                    }
                }
            }

            function Qe(e, t, r) {
                this.line = t, this.rest = Ir(t), this.size = this.rest ? dn(Un(this.rest)) - r + 1 : 1, this.node = this.text = null, this.hidden = Rr(e, t)
            }

            function Je(e, t, r) {
                for (var n, i = [], o = t; o < r; o = n) {
                    var l = new Qe(e.doc, un(e.doc, o), o);
                    n = o + l.size, i.push(l)
                }
                return i
            }

            function et(e, t, r, n) {
                null == t && (t = e.doc.first), null == r && (r = e.doc.first + e.doc.size), n || (n = 0);
                var i = e.display;
                if (n && r < i.viewTo && (null == i.updateLineNumbers || i.updateLineNumbers > t) && (i.updateLineNumbers = t), e.curOp.viewChanged = !0, t >= i.viewTo) Vi && Er(e.doc, t) < i.viewTo && rt(e);
                else if (r <= i.viewFrom) Vi && zr(e.doc, r + n) > i.viewFrom ? rt(e) : (i.viewFrom += n, i.viewTo += n);
                else if (t <= i.viewFrom && r >= i.viewTo) rt(e);
                else if (t <= i.viewFrom) {
                    var o = it(e, r, r + n, 1);
                    o ? (i.view = i.view.slice(o.index), i.viewFrom = o.lineN, i.viewTo += n) : rt(e)
                } else if (r >= i.viewTo) {
                    var o = it(e, t, t, -1);
                    o ? (i.view = i.view.slice(0, o.index), i.viewTo = o.lineN) : rt(e)
                } else {
                    var l = it(e, t, t, -1),
                        a = it(e, r, r + n, 1);
                    l && a ? (i.view = i.view.slice(0, l.index).concat(Je(e, l.lineN, a.lineN)).concat(i.view.slice(a.index)), i.viewTo += n) : rt(e)
                }
                var s = i.externalMeasured;
                s && (r < s.lineN ? s.lineN += n : t < s.lineN + s.size && (i.externalMeasured = null))
            }

            function tt(e, t, r) {
                e.curOp.viewChanged = !0;
                var n = e.display,
                    i = e.display.externalMeasured;
                if (i && t >= i.lineN && t < i.lineN + i.size && (n.externalMeasured = null), !(t < n.viewFrom || t >= n.viewTo)) {
                    var o = n.view[nt(e, t)];
                    if (null != o.node) {
                        var l = o.changes || (o.changes = []);
                        Kn(l, r) == -1 && l.push(r)
                    }
                }
            }

            function rt(e) {
                e.display.viewFrom = e.display.viewTo = e.doc.first, e.display.view = [], e.display.viewOffset = 0
            }

            function nt(e, t) {
                if (t >= e.display.viewTo) return null;
                if (t -= e.display.viewFrom, t < 0) return null;
                for (var r = e.display.view, n = 0; n < r.length; n++)
                    if (t -= r[n].size, t < 0) return n
            }

            function it(e, t, r, n) {
                var i, o = nt(e, t),
                    l = e.display.view;
                if (!Vi) return {
                    index: o,
                    lineN: r
                };
                for (var a = 0, s = e.display.viewFrom; a < o; a++) s += l[a].size;
                if (s != t) {
                    if (n > 0) {
                        if (o == l.length - 1) return null;
                        i = s + l[o].size - t, o++
                    } else i = s - t;
                    t += i, r += i
                }
                for (; Er(e.doc, r) != r;) {
                    if (o == (n < 0 ? 0 : l.length - 1)) return null;
                    r += n * l[o - (n < 0 ? 1 : 0)].size, o += n
                }
                return {
                    index: o,
                    lineN: r
                }
            }

            function ot(e, t, r) {
                var n = e.display,
                    i = n.view;
                0 == i.length || t >= n.viewTo || r <= n.viewFrom ? (n.view = Je(e, t, r), n.viewFrom = t) : (n.viewFrom > t ? n.view = Je(e, t, n.viewFrom).concat(n.view) : n.viewFrom < t && (n.view = n.view.slice(nt(e, t))), n.viewFrom = t, n.viewTo < r ? n.view = n.view.concat(Je(e, n.viewTo, r)) : n.viewTo > r && (n.view = n.view.slice(0, nt(e, r)))), n.viewTo = r
            }

            function lt(e) {
                for (var t = e.display.view, r = 0, n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.hidden || i.node && !i.changes || ++r
                }
                return r
            }

            function at(e) {
                e.display.pollingFast || e.display.poll.set(e.options.pollInterval, function() {
                    ut(e), e.state.focused && at(e)
                })
            }

            function st(e) {
                function t() {
                    var n = ut(e);
                    n || r ? (e.display.pollingFast = !1, at(e)) : (r = !0, e.display.poll.set(60, t))
                }
                var r = !1;
                e.display.pollingFast = !0, e.display.poll.set(20, t)
            }

            function ut(e) {
                var t = e.display.input,
                    r = e.display.prevInput,
                    n = e.doc;
                if (!e.state.focused || nl(t) || dt(e) || e.options.disableInput) return !1;
                var i = t.value;
                if (i == r && !e.somethingSelected()) return !1;
                if (Si && !wi && e.display.inputHasSelection === i) return ct(e), !1;
                var o = !e.curOp;
                o && Xe(e), e.display.shift = !1;
                for (var l = 0, a = Math.min(r.length, i.length); l < a && r.charCodeAt(l) == i.charCodeAt(l);) ++l;
                for (var s = i.slice(l), u = rl(s), c = e.state.pasteIncoming && u.length > 1 && n.sel.ranges.length == u.length, f = n.sel.ranges.length - 1; f >= 0; f--) {
                    var h = n.sel.ranges[f],
                        d = h.from(),
                        p = h.to();
                    l < r.length ? d = Ui(d.line, d.ch - (r.length - l)) : e.state.overwrite && h.empty() && !e.state.pasteIncoming && (p = Ui(p.line, Math.min(un(n, p.line).text.length, p.ch + Un(u).length)));
                    var g = e.curOp.updateInput,
                        v = {
                            from: d,
                            to: p,
                            text: c ? [u[f]] : u,
                            origin: e.state.pasteIncoming ? "paste" : e.state.cutIncoming ? "cut" : "+input"
                        };
                    if (Kt(e.doc, v), En(e, "inputRead", e, v), s && !e.state.pasteIncoming && e.options.electricChars && e.options.smartIndent && h.head.ch < 100 && (!f || n.sel.ranges[f - 1].head.line != h.head.line)) {
                        var m = e.getModeAt(h.head).electricChars;
                        if (m)
                            for (var y = 0; y < m.length; y++)
                                if (s.indexOf(m.charAt(y)) > -1) {
                                    ir(e, h.head.line, "smart");
                                    break
                                }
                    }
                }
                return rr(e), e.curOp.updateInput = g, e.curOp.typing = !0, i.length > 1e3 || i.indexOf("\n") > -1 ? t.value = e.display.prevInput = "" : e.display.prevInput = i, o && Ye(e), e.state.pasteIncoming = e.state.cutIncoming = !1, !0
            }

            function ct(e, t) {
                var r, n, i = e.doc;
                if (e.somethingSelected()) {
                    e.display.prevInput = "";
                    var o = i.sel.primary();
                    r = il && (o.to().line - o.from().line > 100 || (n = e.getSelection()).length > 1e3);
                    var l = r ? "-" : n || e.getSelection();
                    e.display.input.value = l, e.state.focused && Xo(e.display.input), Si && !wi && (e.display.inputHasSelection = l)
                } else t || (e.display.prevInput = e.display.input.value = "", Si && !wi && (e.display.inputHasSelection = null));
                e.display.inaccurateSelection = r
            }

            function ft(e) {
                "nocursor" == e.options.readOnly || Ei && ri() == e.display.input || e.display.input.focus()
            }

            function ht(e) {
                e.state.focused || (ft(e), Et(e))
            }

            function dt(e) {
                return e.options.readOnly || e.doc.cantEdit
            }

            function pt(e) {
                function t() {
                    e.state.focused && setTimeout(jn(ft, e), 0)
                }

                function r() {
                    null == a && (a = setTimeout(function() {
                        a = null, l.cachedCharWidth = l.cachedTextHeight = l.cachedPaddingH = Qo = null, e.setSize()
                    }, 100))
                }

                function n() {
                    ti(document.body, l.wrapper) ? setTimeout(n, 5e3) : zo(window, "resize", r)
                }

                function i(t) {
                    Rn(e, t) || Io(t)
                }

                function o(t) {
                    l.inaccurateSelection && (l.prevInput = "", l.inaccurateSelection = !1, l.input.value = e.getSelection(), Xo(l.input)), "cut" == t.type && (e.state.cutIncoming = !0)
                }
                var l = e.display;
                Eo(l.scroller, "mousedown", $e(e, mt)), bi ? Eo(l.scroller, "dblclick", $e(e, function(t) {
                    if (!Rn(e, t)) {
                        var r = vt(e, t);
                        if (r && !Ct(e, t) && !gt(e.display, t)) {
                            Wo(t);
                            var n = ur(e.doc, r);
                            ee(e.doc, n.anchor, n.head)
                        }
                    }
                })) : Eo(l.scroller, "dblclick", function(t) {
                    Rn(e, t) || Wo(t)
                }), Eo(l.lineSpace, "selectstart", function(e) {
                    gt(l, e) || Wo(e)
                }), Bi || Eo(l.scroller, "contextmenu", function(t) {
                    Rt(e, t)
                }), Eo(l.scroller, "scroll", function() {
                    l.scroller.clientHeight && (kt(e, l.scroller.scrollTop), Mt(e, l.scroller.scrollLeft, !0), Ro(e, "scroll", e))
                }), Eo(l.scrollbarV, "scroll", function() {
                    l.scroller.clientHeight && kt(e, l.scrollbarV.scrollTop)
                }), Eo(l.scrollbarH, "scroll", function() {
                    l.scroller.clientHeight && Mt(e, l.scrollbarH.scrollLeft)
                }), Eo(l.scroller, "mousewheel", function(t) {
                    Tt(e, t)
                }), Eo(l.scroller, "DOMMouseScroll", function(t) {
                    Tt(e, t)
                }), Eo(l.scrollbarH, "mousedown", t), Eo(l.scrollbarV, "mousedown", t), Eo(l.wrapper, "scroll", function() {
                    l.wrapper.scrollTop = l.wrapper.scrollLeft = 0
                });
                var a;
                Eo(window, "resize", r), setTimeout(n, 5e3), Eo(l.input, "keyup", $e(e, Dt)), Eo(l.input, "input", function() {
                    Si && !wi && e.display.inputHasSelection && (e.display.inputHasSelection = null), st(e)
                }), Eo(l.input, "keydown", $e(e, Wt)), Eo(l.input, "keypress", $e(e, It)), Eo(l.input, "focus", jn(Et, e)), Eo(l.input, "blur", jn(zt, e)), e.options.dragDrop && (Eo(l.scroller, "dragstart", function(t) {
                    St(e, t)
                }), Eo(l.scroller, "dragenter", i), Eo(l.scroller, "dragover", i), Eo(l.scroller, "drop", $e(e, Lt))), Eo(l.scroller, "paste", function(t) {
                    gt(l, t) || (e.state.pasteIncoming = !0, ft(e), st(e))
                }), Eo(l.input, "paste", function() {
                    e.state.pasteIncoming = !0, st(e)
                }), Eo(l.input, "cut", o), Eo(l.input, "copy", o), Hi && Eo(l.sizer, "mouseup", function() {
                    ri() == l.input && l.input.blur(), ft(e)
                })
            }

            function gt(e, t) {
                for (var r = Dn(t); r != e.wrapper; r = r.parentNode)
                    if (!r || r.ignoreEvents || r.parentNode == e.sizer && r != e.mover) return !0
            }

            function vt(e, t, r, n) {
                var i = e.display;
                if (!r) {
                    var o = Dn(t);
                    if (o == i.scrollbarH || o == i.scrollbarV || o == i.scrollbarFiller || o == i.gutterFiller) return null
                }
                var l, a, s = i.lineSpace.getBoundingClientRect();
                try {
                    l = t.clientX - s.left, a = t.clientY - s.top
                } catch (e) {
                    return null
                }
                var u, c = Ve(e, l, a);
                if (n && 1 == c.xRel && (u = un(e.doc, c.line).text).length == c.ch) {
                    var f = Ko(u, u.length, e.options.tabSize) - u.length;
                    c = Ui(c.line, Math.round((l - Ce(e.display).left) / _e(e.display)) - f)
                }
                return c
            }

            function mt(e) {
                if (!Rn(this, e)) {
                    var t = this,
                        r = t.display;
                    if (r.shift = e.shiftKey, gt(r, e)) return void(ki || (r.scroller.draggable = !1, setTimeout(function() {
                        r.scroller.draggable = !0
                    }, 100)));
                    if (!Ct(t, e)) {
                        var n = vt(t, e);
                        switch (window.focus(), In(e)) {
                            case 1:
                                n ? yt(t, e, n) : Dn(e) == r.scroller && Wo(e);
                                break;
                            case 2:
                                ki && (t.state.lastMiddleDown = +new Date), n && ee(t.doc, n), setTimeout(jn(ft, t), 20), Wo(e);
                                break;
                            case 3:
                                Bi && Rt(t, e)
                        }
                    }
                }
            }

            function yt(e, t, r) {
                setTimeout(jn(ht, e), 0);
                var n, i = +new Date;
                Yi && Yi.time > i - 400 && 0 == Ki(Yi.pos, r) ? n = "triple" : Xi && Xi.time > i - 400 && 0 == Ki(Xi.pos, r) ? (n = "double", Yi = {
                    time: i,
                    pos: r
                }) : (n = "single", Xi = {
                    time: i,
                    pos: r
                });
                var o = e.doc.sel,
                    l = !1;
                e.options.dragDrop && tl && !l && !dt(e) && "single" == n && o.contains(r) > -1 && o.somethingSelected() ? bt(e, t, r) : xt(e, t, r, n, l)
            }

            function bt(e, t, r) {
                var n = e.display,
                    i = $e(e, function(o) {
                        ki && (n.scroller.draggable = !1), e.state.draggingText = !1, zo(document, "mouseup", i), zo(n.scroller, "drop", i), Math.abs(t.clientX - o.clientX) + Math.abs(t.clientY - o.clientY) < 10 && (Wo(o), ee(e.doc, r), ft(e), bi && !wi && setTimeout(function() {
                            document.body.focus(), ft(e)
                        }, 20))
                    });
                ki && (n.scroller.draggable = !0), e.state.draggingText = i, n.scroller.dragDrop && n.scroller.dragDrop(), Eo(document, "mouseup", i), Eo(n.scroller, "drop", i)
            }

            function xt(e, t, r, n, i) {
                function o(t) {
                    if (0 != Ki(g, t))
                        if (g = t, "rect" == n) {
                            for (var i = [], o = e.options.tabSize, l = Ko(un(u, r.line).text, r.ch, o), a = Ko(un(u, t.line).text, t.ch, o), s = Math.min(l, a), d = Math.max(l, a), p = Math.min(r.line, t.line), v = Math.min(e.lastLine(), Math.max(r.line, t.line)); p <= v; p++) {
                                var m = un(u, p).text,
                                    y = Gn(m, s, o);
                                s == d ? i.push(new _(Ui(p, y), Ui(p, y))) : m.length > y && i.push(new _(Ui(p, y), Ui(p, Gn(m, d, o))))
                            }
                            i.length || i.push(new _(r, r)), le(u, X(h.ranges.slice(0, f).concat(i), f), Vo)
                        } else {
                            var b = c,
                                x = b.anchor,
                                w = t;
                            if ("single" != n) {
                                if ("double" == n) var C = ur(u, t);
                                else var C = new _(Ui(t.line, 0), $(u, Ui(t.line + 1, 0)));
                                Ki(C.anchor, x) > 0 ? (w = C.head, x = U(b.from(), C.anchor)) : (w = C.anchor, x = V(b.to(), C.head))
                            }
                            var i = h.ranges.slice(0);
                            i[f] = new _($(u, x), w), le(u, X(i, f), Vo)
                        }
                }

                function l(t) {
                    var r = ++y,
                        i = vt(e, t, !0, "rect" == n);
                    if (i)
                        if (0 != Ki(i, g)) {
                            ht(e), o(i);
                            var a = v(s, u);
                            (i.line >= a.to || i.line < a.from) && setTimeout($e(e, function() {
                                y == r && l(t)
                            }), 150)
                        } else {
                            var c = t.clientY < m.top ? -20 : t.clientY > m.bottom ? 20 : 0;
                            c && setTimeout($e(e, function() {
                                y == r && (s.scroller.scrollTop += c, l(t))
                            }), 50)
                        }
                }

                function a(t) {
                    y = 1 / 0, Wo(t), ft(e), zo(document, "mousemove", b), zo(document, "mouseup", x), u.history.lastSelOrigin = null
                }
                var s = e.display,
                    u = e.doc;
                Wo(t);
                var c, f, h = u.sel;
                if (i ? (f = u.sel.contains(r), c = f > -1 ? u.sel.ranges[f] : new _(r, r)) : c = u.sel.primary(), t.altKey) n = "rect", i || (c = new _(r, r)), r = vt(e, t, !0, !0), f = -1;
                else if ("double" == n) {
                    var d = ur(u, r);
                    c = e.display.shift || u.extend ? J(u, c, d.anchor, d.head) : d
                } else if ("triple" == n) {
                    var p = new _(Ui(r.line, 0), $(u, Ui(r.line + 1, 0)));
                    c = e.display.shift || u.extend ? J(u, c, p.anchor, p.head) : p
                } else c = J(u, c, r);
                i ? f > -1 ? re(u, f, c, Vo) : (f = u.sel.ranges.length, le(u, X(u.sel.ranges.concat([c]), f), {
                    scroll: !1,
                    origin: "*mouse"
                })) : (f = 0, le(u, new K([c], 0), Vo));
                var g = r,
                    m = s.wrapper.getBoundingClientRect(),
                    y = 0,
                    b = $e(e, function(e) {
                        (Si && !Ci ? e.buttons : In(e)) ? l(e): a(e)
                    }),
                    x = $e(e, a);
                Eo(document, "mousemove", b), Eo(document, "mouseup", x)
            }

            function wt(e, t, r, n, i) {
                try {
                    var o = t.clientX,
                        l = t.clientY
                } catch (e) {
                    return !1
                }
                if (o >= Math.floor(e.display.gutters.getBoundingClientRect().right)) return !1;
                n && Wo(t);
                var a = e.display,
                    s = a.lineDiv.getBoundingClientRect();
                if (l > s.bottom || !Pn(e, r)) return Wn(t);
                l -= s.top - a.viewOffset;
                for (var u = 0; u < e.options.gutters.length; ++u) {
                    var c = a.gutters.childNodes[u];
                    if (c && c.getBoundingClientRect().right >= o) {
                        var f = pn(e.doc, l),
                            h = e.options.gutters[u];
                        return i(e, r, e, f, h, t), Wn(t)
                    }
                }
            }

            function Ct(e, t) {
                return wt(e, t, "gutterClick", !0, En)
            }

            function Lt(e) {
                var t = this;
                if (!Rn(t, e) && !gt(t.display, e)) {
                    Wo(e), bi && (qi = +new Date);
                    var r = vt(t, e, !0),
                        n = e.dataTransfer.files;
                    if (r && !dt(t))
                        if (n && n.length && window.FileReader && window.File)
                            for (var i = n.length, o = Array(i), l = 0, a = function(e, n) {
                                    var a = new FileReader;
                                    a.onload = function() {
                                        if (o[n] = a.result, ++l == i) {
                                            r = $(t.doc, r);
                                            var e = {
                                                from: r,
                                                to: r,
                                                text: rl(o.join("\n")),
                                                origin: "paste"
                                            };
                                            Kt(t.doc, e), oe(t.doc, Y(r, ro(e)))
                                        }
                                    }, a.readAsText(e)
                                }, s = 0; s < i; ++s) a(n[s], s);
                        else {
                            if (t.state.draggingText && t.doc.sel.contains(r) > -1) return t.state.draggingText(e), void setTimeout(jn(ft, t), 20);
                            try {
                                var o = e.dataTransfer.getData("Text");
                                if (o) {
                                    var u = t.state.draggingText && t.listSelections();
                                    if (ae(t.doc, Y(r, r)), u)
                                        for (var s = 0; s < u.length; ++s) qt(t.doc, "", u[s].anchor, u[s].head, "drag");
                                    t.replaceSelection(o, "around", "paste"), ft(t)
                                }
                            } catch (e) {}
                        }
                }
            }

            function St(e, t) {
                if (bi && (!e.state.draggingText || +new Date - qi < 100)) return void Io(t);
                if (!Rn(e, t) && !gt(e.display, t) && (t.dataTransfer.setData("Text", e.getSelection()), t.dataTransfer.setDragImage && !Oi)) {
                    var r = Qn("img", null, null, "position: fixed; left: 0; top: 0;");
                    r.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", Ni && (r.width = r.height = 1, e.display.wrapper.appendChild(r), r._top = r.offsetTop), t.dataTransfer.setDragImage(r, 0, 0), Ni && r.parentNode.removeChild(r)
                }
            }

            function kt(e, t) {
                Math.abs(e.doc.scrollTop - t) < 2 || (e.doc.scrollTop = t, yi || w(e, {
                    top: t
                }), e.display.scroller.scrollTop != t && (e.display.scroller.scrollTop = t), e.display.scrollbarV.scrollTop != t && (e.display.scrollbarV.scrollTop = t), yi && w(e), ve(e, 100))
            }

            function Mt(e, t, r) {
                (r ? t == e.doc.scrollLeft : Math.abs(e.doc.scrollLeft - t) < 2) || (t = Math.min(t, e.display.scroller.scrollWidth - e.display.scroller.clientWidth), e.doc.scrollLeft = t, m(e), e.display.scroller.scrollLeft != t && (e.display.scroller.scrollLeft = t), e.display.scrollbarH.scrollLeft != t && (e.display.scrollbarH.scrollLeft = t))
            }

            function Tt(e, t) {
                var r = t.wheelDeltaX,
                    n = t.wheelDeltaY;
                null == r && t.detail && t.axis == t.HORIZONTAL_AXIS && (r = t.detail), null == n && t.detail && t.axis == t.VERTICAL_AXIS ? n = t.detail : null == n && (n = t.wheelDelta);
                var i = e.display,
                    o = i.scroller;
                if (r && o.scrollWidth > o.clientWidth || n && o.scrollHeight > o.clientHeight) {
                    if (n && zi && ki) e: for (var l = t.target, a = i.view; l != o; l = l.parentNode)
                        for (var s = 0; s < a.length; s++)
                            if (a[s].node == l) {
                                e.display.currentWheelTarget = l;
                                break e
                            }
                    if (r && !yi && !Ni && null != Qi) return n && kt(e, Math.max(0, Math.min(o.scrollTop + n * Qi, o.scrollHeight - o.clientHeight))), Mt(e, Math.max(0, Math.min(o.scrollLeft + r * Qi, o.scrollWidth - o.clientWidth))), Wo(t), void(i.wheelStartX = null);
                    if (n && null != Qi) {
                        var u = n * Qi,
                            c = e.doc.scrollTop,
                            f = c + i.wrapper.clientHeight;
                        u < 0 ? c = Math.max(0, c + u - 50) : f = Math.min(e.doc.height, f + u + 50), w(e, {
                            top: c,
                            bottom: f
                        })
                    }
                    Zi < 20 && (null == i.wheelStartX ? (i.wheelStartX = o.scrollLeft, i.wheelStartY = o.scrollTop, i.wheelDX = r, i.wheelDY = n, setTimeout(function() {
                        if (null != i.wheelStartX) {
                            var e = o.scrollLeft - i.wheelStartX,
                                t = o.scrollTop - i.wheelStartY,
                                r = t && i.wheelDY && t / i.wheelDY || e && i.wheelDX && e / i.wheelDX;
                            i.wheelStartX = i.wheelStartY = null, r && (Qi = (Qi * Zi + r) / (Zi + 1), ++Zi)
                        }
                    }, 200)) : (i.wheelDX += r, i.wheelDY += n))
                }
            }

            function Nt(e, t, r) {
                if ("string" == typeof t && (t = po[t], !t)) return !1;
                e.display.pollingFast && ut(e) && (e.display.pollingFast = !1);
                var n = e.display.shift,
                    i = !1;
                try {
                    dt(e) && (e.state.suppressEdits = !0), r && (e.display.shift = !1), i = t(e) != Bo
                } finally {
                    e.display.shift = n, e.state.suppressEdits = !1
                }
                return i
            }

            function Ot(e) {
                var t = e.state.keyMaps.slice(0);
                return e.options.extraKeys && t.push(e.options.extraKeys), t.push(e.options.keyMap), t
            }

            function Ht(e, t) {
                var r = fr(e.options.keyMap),
                    n = r.auto;
                clearTimeout(Ji), n && !mo(t) && (Ji = setTimeout(function() {
                    fr(e.options.keyMap) == r && (e.options.keyMap = n.call ? n.call(null, e) : n, a(e))
                }, 50));
                var i = yo(t, !0),
                    o = !1;
                if (!i) return !1;
                var l = Ot(e);
                return o = t.shiftKey ? vo("Shift-" + i, l, function(t) {
                    return Nt(e, t, !0)
                }) || vo(i, l, function(t) {
                    if ("string" == typeof t ? /^go[A-Z]/.test(t) : t.motion) return Nt(e, t)
                }) : vo(i, l, function(t) {
                    return Nt(e, t)
                }), o && (Wo(t), ge(e), En(e, "keyHandled", e, i, t)), o
            }

            function At(e, t, r) {
                var n = vo("'" + r + "'", Ot(e), function(t) {
                    return Nt(e, t, !0)
                });
                return n && (Wo(t), ge(e), En(e, "keyHandled", e, "'" + r + "'", t)), n
            }

            function Wt(e) {
                var t = this;
                if (ht(t), !Rn(t, e)) {
                    bi && 27 == e.keyCode && (e.returnValue = !1);
                    var r = e.keyCode;
                    t.display.shift = 16 == r || e.shiftKey;
                    var n = Ht(t, e);
                    Ni && (to = n ? r : null, !n && 88 == r && !il && (zi ? e.metaKey : e.ctrlKey) && t.replaceSelection("", null, "cut"))
                }
            }

            function Dt(e) {
                Rn(this, e) || 16 == e.keyCode && (this.doc.sel.shift = !1)
            }

            function It(e) {
                var t = this;
                if (!Rn(t, e)) {
                    var r = e.keyCode,
                        n = e.charCode;
                    if (Ni && r == to) return to = null, void Wo(e);
                    if (!(Ni && (!e.which || e.which < 10) || Hi) || !Ht(t, e)) {
                        var i = String.fromCharCode(null == n ? r : n);
                        At(t, e, i) || (Si && !wi && (t.display.inputHasSelection = null), st(t))
                    }
                }
            }

            function Et(e) {
                "nocursor" != e.options.readOnly && (e.state.focused || (Ro(e, "focus", e), e.state.focused = !0, e.display.wrapper.className.search(/\bCodeMirror-focused\b/) == -1 && (e.display.wrapper.className += " CodeMirror-focused"), e.curOp || (ct(e), ki && setTimeout(jn(ct, e, !0), 0))), at(e), ge(e))
            }

            function zt(e) {
                e.state.focused && (Ro(e, "blur", e), e.state.focused = !1, e.display.wrapper.className = e.display.wrapper.className.replace(" CodeMirror-focused", "")), clearInterval(e.display.blinker), setTimeout(function() {
                    e.state.focused || (e.display.shift = !1)
                }, 150)
            }

            function Rt(e, t) {
                function r() {
                    if (null != i.input.selectionStart) {
                        var t = i.input.value = "​" + (e.somethingSelected() ? i.input.value : "");
                        i.prevInput = "​", i.input.selectionStart = 1, i.input.selectionEnd = t.length
                    }
                }

                function n() {
                    if (i.inputDiv.style.position = "relative", i.input.style.cssText = s, wi && (i.scrollbarV.scrollTop = i.scroller.scrollTop = l), at(e), null != i.input.selectionStart) {
                        Si && !wi || r(), clearTimeout(eo);
                        var t = 0,
                            n = function() {
                                "​" == i.prevInput && 0 == i.input.selectionStart ? $e(e, po.selectAll)(e) : t++ < 10 ? eo = setTimeout(n, 500) : ct(e)
                            };
                        eo = setTimeout(n, 200)
                    }
                }
                if (!Rn(e, t, "contextmenu")) {
                    var i = e.display;
                    if (!gt(i, t) && !Pt(e, t)) {
                        var o = vt(e, t),
                            l = i.scroller.scrollTop;
                        if (o && !Ni) {
                            var a = e.options.resetSelectionOnContextMenu;
                            a && e.doc.sel.contains(o) == -1 && $e(e, le)(e.doc, Y(o), Go);
                            var s = i.input.style.cssText;
                            if (i.inputDiv.style.position = "absolute", i.input.style.cssText = "position: fixed; width: 30px; height: 30px; top: " + (t.clientY - 5) + "px; left: " + (t.clientX - 5) + "px; z-index: 1000; background: " + (Si ? "rgba(255, 255, 255, .05)" : "transparent") + "; outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);", ft(e), ct(e), e.somethingSelected() || (i.input.value = i.prevInput = " "), Si && !wi && r(), Bi) {
                                Io(t);
                                var u = function() {
                                    zo(window, "mouseup", u), setTimeout(n, 20)
                                };
                                Eo(window, "mouseup", u)
                            } else setTimeout(n, 50)
                        }
                    }
                }
            }

            function Pt(e, t) {
                return !!Pn(e, "gutterContextMenu") && wt(e, t, "gutterContextMenu", !1, Ro)
            }

            function Ft(e, t) {
                if (Ki(e, t.from) < 0) return e;
                if (Ki(e, t.to) <= 0) return ro(t);
                var r = e.line + t.text.length - (t.to.line - t.from.line) - 1,
                    n = e.ch;
                return e.line == t.to.line && (n += ro(t).ch - t.to.ch), Ui(r, n)
            }

            function Bt(e, t) {
                for (var r = [], n = 0; n < e.sel.ranges.length; n++) {
                    var i = e.sel.ranges[n];
                    r.push(new _(Ft(i.anchor, t), Ft(i.head, t)))
                }
                return X(r, e.sel.primIndex)
            }

            function Gt(e, t, r) {
                return e.line == t.line ? Ui(r.line, e.ch - t.ch + r.ch) : Ui(r.line + (e.line - t.line), e.ch)
            }

            function Vt(e, t, r) {
                for (var n = [], i = Ui(e.first, 0), o = i, l = 0; l < t.length; l++) {
                    var a = t[l],
                        s = Gt(a.from, i, o),
                        u = Gt(ro(a), i, o);
                    if (i = a.to, o = u, "around" == r) {
                        var c = e.sel.ranges[l],
                            f = Ki(c.head, c.anchor) < 0;
                        n[l] = new _(f ? u : s, f ? s : u)
                    } else n[l] = new _(s, s)
                }
                return new K(n, e.sel.primIndex)
            }

            function Ut(e, t, r) {
                var n = {
                    canceled: !1,
                    from: t.from,
                    to: t.to,
                    text: t.text,
                    origin: t.origin,
                    cancel: function() {
                        this.canceled = !0
                    }
                };
                return r && (n.update = function(t, r, n, i) {
                    t && (this.from = $(e, t)), r && (this.to = $(e, r)), n && (this.text = n), void 0 !== i && (this.origin = i)
                }), Ro(e, "beforeChange", e, n), e.cm && Ro(e.cm, "beforeChange", e.cm, n), n.canceled ? null : {
                    from: n.from,
                    to: n.to,
                    text: n.text,
                    origin: n.origin
                }
            }

            function Kt(e, t, r) {
                if (e.cm) {
                    if (!e.cm.curOp) return $e(e.cm, Kt)(e, t, r);
                    if (e.cm.state.suppressEdits) return
                }
                if (!(Pn(e, "beforeChange") || e.cm && Pn(e.cm, "beforeChange")) || (t = Ut(e, t, !0))) {
                    var n = Gi && !r && Lr(e, t.from, t.to);
                    if (n)
                        for (var i = n.length - 1; i >= 0; --i) _t(e, {
                            from: n[i].from,
                            to: n[i].to,
                            text: i ? [""] : t.text
                        });
                    else _t(e, t)
                }
            }

            function _t(e, t) {
                if (1 != t.text.length || "" != t.text[0] || 0 != Ki(t.from, t.to)) {
                    var r = Bt(e, t);
                    wn(e, t, r, e.cm ? e.cm.curOp.id : NaN), jt(e, t, r, xr(e, t));
                    var n = [];
                    an(e, function(e, r) {
                        r || Kn(n, e.history) != -1 || (An(e.history, t), n.push(e.history)), jt(e, t, null, xr(e, t))
                    })
                }
            }

            function Xt(e, t, r) {
                if (!e.cm || !e.cm.state.suppressEdits) {
                    for (var n, i = e.history, o = e.sel, l = "undo" == t ? i.done : i.undone, a = "undo" == t ? i.undone : i.done, s = 0; s < l.length && (n = l[s], r ? !n.ranges || n.equals(e.sel) : n.ranges); s++);
                    if (s != l.length) {
                        for (i.lastOrigin = i.lastSelOrigin = null; n = l.pop(), n.ranges;) {
                            if (Sn(n, a), r && !n.equals(e.sel)) return void le(e, n, {
                                clearRedo: !1
                            });
                            o = n
                        }
                        var u = [];
                        Sn(o, a), a.push({
                            changes: u,
                            generation: i.generation
                        }), i.generation = n.generation || ++i.maxGeneration;
                        for (var c = Pn(e, "beforeChange") || e.cm && Pn(e.cm, "beforeChange"), s = n.changes.length - 1; s >= 0; --s) {
                            var f = n.changes[s];
                            if (f.origin = t, c && !Ut(e, f, !1)) return void(l.length = 0);
                            u.push(yn(e, f));
                            var h = s ? Bt(e, f, null) : Un(l);
                            jt(e, f, h, Cr(e, f)), e.cm && rr(e.cm);
                            var d = [];
                            an(e, function(e, t) {
                                t || Kn(d, e.history) != -1 || (An(e.history, f), d.push(e.history)), jt(e, f, null, Cr(e, f))
                            })
                        }
                    }
                }
            }

            function Yt(e, t) {
                e.first += t, e.sel = new K(_n(e.sel.ranges, function(e) {
                    return new _(Ui(e.anchor.line + t, e.anchor.ch), Ui(e.head.line + t, e.head.ch))
                }), e.sel.primIndex), e.cm && et(e.cm, e.first, e.first - t, t)
            }

            function jt(e, t, r, n) {
                if (e.cm && !e.cm.curOp) return $e(e.cm, jt)(e, t, r, n);
                if (t.to.line < e.first) return void Yt(e, t.text.length - 1 - (t.to.line - t.from.line));
                if (!(t.from.line > e.lastLine())) {
                    if (t.from.line < e.first) {
                        var i = t.text.length - 1 - (e.first - t.from.line);
                        Yt(e, i), t = {
                            from: Ui(e.first, 0),
                            to: Ui(t.to.line + i, t.to.ch),
                            text: [Un(t.text)],
                            origin: t.origin
                        }
                    }
                    var o = e.lastLine();
                    t.to.line > o && (t = {
                        from: t.from,
                        to: Ui(o, un(e, o).text.length),
                        text: [t.text[0]],
                        origin: t.origin
                    }), t.removed = cn(e, t.from, t.to), r || (r = Bt(e, t, null)), e.cm ? $t(e.cm, t, n) : nn(e, t, n), ae(e, r, Go)
                }
            }

            function $t(e, t, r) {
                var n = e.doc,
                    i = e.display,
                    l = t.from,
                    a = t.to,
                    s = !1,
                    u = l.line;
                e.options.lineWrapping || (u = dn(Dr(un(n, l.line))), n.iter(u, a.line + 1, function(e) {
                    if (e == i.maxLine) return s = !0, !0
                })), n.sel.contains(t.from, t.to) > -1 && (e.curOp.cursorActivity = !0), nn(n, t, r, o(e)), e.options.lineWrapping || (n.iter(u, l.line + t.text.length, function(e) {
                    var t = f(e);
                    t > i.maxLineLength && (i.maxLine = e, i.maxLineLength = t, i.maxLineChanged = !0, s = !1)
                }), s && (e.curOp.updateMaxLine = !0)), n.frontier = Math.min(n.frontier, l.line), ve(e, 400);
                var c = t.text.length - (a.line - l.line) - 1;
                l.line != a.line || 1 != t.text.length || rn(e.doc, t) ? et(e, l.line, a.line + 1, c) : tt(e, l.line, "text"), (Pn(e, "change") || Pn(e, "changes")) && (e.curOp.changeObjs || (e.curOp.changeObjs = [])).push({
                    from: l,
                    to: a,
                    text: t.text,
                    removed: t.removed,
                    origin: t.origin
                })
            }

            function qt(e, t, r, n, i) {
                if (n || (n = r), Ki(n, r) < 0) {
                    var o = n;
                    n = r, r = o
                }
                "string" == typeof t && (t = rl(t)), Kt(e, {
                    from: r,
                    to: n,
                    text: t,
                    origin: i
                })
            }

            function Zt(e, t) {
                var r = e.display,
                    n = r.sizer.getBoundingClientRect(),
                    i = null;
                if (t.top + n.top < 0 ? i = !0 : t.bottom + n.top > (window.innerHeight || document.documentElement.clientHeight) && (i = !1), null != i && !Di) {
                    var o = Qn("div", "​", null, "position: absolute; top: " + (t.top - r.viewOffset - xe(e.display)) + "px; height: " + (t.bottom - t.top + Fo) + "px; left: " + t.left + "px; width: 2px;");
                    e.display.lineSpace.appendChild(o), o.scrollIntoView(i), e.display.lineSpace.removeChild(o)
                }
            }

            function Qt(e, t, r, n) {
                for (null == n && (n = 0);;) {
                    var i = !1,
                        o = Fe(e, t),
                        l = r && r != t ? Fe(e, r) : o,
                        a = er(e, Math.min(o.left, l.left), Math.min(o.top, l.top) - n, Math.max(o.left, l.left), Math.max(o.bottom, l.bottom) + n),
                        s = e.doc.scrollTop,
                        u = e.doc.scrollLeft;
                    if (null != a.scrollTop && (kt(e, a.scrollTop), Math.abs(e.doc.scrollTop - s) > 1 && (i = !0)), null != a.scrollLeft && (Mt(e, a.scrollLeft), Math.abs(e.doc.scrollLeft - u) > 1 && (i = !0)), !i) return o
                }
            }

            function Jt(e, t, r, n, i) {
                var o = er(e, t, r, n, i);
                null != o.scrollTop && kt(e, o.scrollTop), null != o.scrollLeft && Mt(e, o.scrollLeft)
            }

            function er(e, t, r, n, i) {
                var o = e.display,
                    l = Ke(e.display);
                r < 0 && (r = 0);
                var a = e.curOp && null != e.curOp.scrollTop ? e.curOp.scrollTop : o.scroller.scrollTop,
                    s = o.scroller.clientHeight - Fo,
                    u = {},
                    c = e.doc.height + we(o),
                    f = r < l,
                    h = i > c - l;
                if (r < a) u.scrollTop = f ? 0 : r;
                else if (i > a + s) {
                    var d = Math.min(r, (h ? c : i) - s);
                    d != a && (u.scrollTop = d)
                }
                var p = e.curOp && null != e.curOp.scrollLeft ? e.curOp.scrollLeft : o.scroller.scrollLeft,
                    g = o.scroller.clientWidth - Fo;
                t += o.gutters.offsetWidth, n += o.gutters.offsetWidth;
                var v = o.gutters.offsetWidth,
                    m = t < v + 10;
                return t < p + v || m ? (m && (t = 0), u.scrollLeft = Math.max(0, t - 10 - v)) : n > g + p - 3 && (u.scrollLeft = n + 10 - g), u
            }

            function tr(e, t, r) {
                null == t && null == r || nr(e), null != t && (e.curOp.scrollLeft = (null == e.curOp.scrollLeft ? e.doc.scrollLeft : e.curOp.scrollLeft) + t), null != r && (e.curOp.scrollTop = (null == e.curOp.scrollTop ? e.doc.scrollTop : e.curOp.scrollTop) + r)
            }

            function rr(e) {
                nr(e);
                var t = e.getCursor(),
                    r = t,
                    n = t;
                e.options.lineWrapping || (r = t.ch ? Ui(t.line, t.ch - 1) : t, n = Ui(t.line, t.ch + 1)), e.curOp.scrollToPos = {
                    from: r,
                    to: n,
                    margin: e.options.cursorScrollMargin,
                    isCursor: !0
                }
            }

            function nr(e) {
                var t = e.curOp.scrollToPos;
                if (t) {
                    e.curOp.scrollToPos = null;
                    var r = Be(e, t.from),
                        n = Be(e, t.to),
                        i = er(e, Math.min(r.left, n.left), Math.min(r.top, n.top) - t.margin, Math.max(r.right, n.right), Math.max(r.bottom, n.bottom) + t.margin);
                    e.scrollTo(i.scrollLeft, i.scrollTop)
                }
            }

            function ir(e, t, r, n) {
                var i, o = e.doc;
                null == r && (r = "add"), "smart" == r && (e.doc.mode.indent ? i = be(e, t) : r = "prev");
                var l = e.options.tabSize,
                    a = un(o, t),
                    s = Ko(a.text, null, l);
                a.stateAfter && (a.stateAfter = null);
                var u, c = a.text.match(/^\s*/)[0];
                if (n || /\S/.test(a.text)) {
                    if ("smart" == r && (u = e.doc.mode.indent(i, a.text.slice(c.length), a.text), u == Bo)) {
                        if (!n) return;
                        r = "prev"
                    }
                } else u = 0, r = "not";
                "prev" == r ? u = t > o.first ? Ko(un(o, t - 1).text, null, l) : 0 : "add" == r ? u = s + e.options.indentUnit : "subtract" == r ? u = s - e.options.indentUnit : "number" == typeof r && (u = s + r), u = Math.max(0, u);
                var f = "",
                    h = 0;
                if (e.options.indentWithTabs)
                    for (var d = Math.floor(u / l); d; --d) h += l, f += "\t";
                if (h < u && (f += Vn(u - h)), f != c) qt(e.doc, f, Ui(t, 0), Ui(t, c.length), "+input");
                else
                    for (var d = 0; d < o.sel.ranges.length; d++) {
                        var p = o.sel.ranges[d];
                        if (p.head.line == t && p.head.ch < c.length) {
                            var h = Ui(t, c.length);
                            re(o, d, new _(h, h));
                            break
                        }
                    }
                a.stateAfter = null
            }

            function or(e, t, r, n) {
                var i = t,
                    o = t,
                    l = e.doc;
                return "number" == typeof t ? o = un(l, j(l, t)) : i = dn(t), null == i ? null : n(o, i) ? (tt(e, i, r), o) : null
            }

            function lr(e, t) {
                for (var r = e.doc.sel.ranges, n = [], i = 0; i < r.length; i++) {
                    for (var o = t(r[i]); n.length && Ki(o.from, Un(n).to) <= 0;) {
                        var l = n.pop();
                        if (Ki(l.from, o.from) < 0) {
                            o.from = l.from;
                            break
                        }
                    }
                    n.push(o)
                }
                je(e, function() {
                    for (var t = n.length - 1; t >= 0; t--) qt(e.doc, "", n[t].from, n[t].to, "+delete");
                    rr(e)
                })
            }

            function ar(e, t, r, n, i) {
                function o() {
                    var t = a + r;
                    return t < e.first || t >= e.first + e.size ? f = !1 : (a = t, c = un(e, t))
                }

                function l(e) {
                    var t = (i ? vi : mi)(c, s, r, !0);
                    if (null == t) {
                        if (e || !o()) return f = !1;
                        s = i ? (r < 0 ? ci : ui)(c) : r < 0 ? c.text.length : 0
                    } else s = t;
                    return !0
                }
                var a = t.line,
                    s = t.ch,
                    u = r,
                    c = un(e, a),
                    f = !0;
                if ("char" == n) l();
                else if ("column" == n) l(!0);
                else if ("word" == n || "group" == n)
                    for (var h = null, d = "group" == n, p = !0; !(r < 0) || l(!p); p = !1) {
                        var g = c.text.charAt(s) || "\n",
                            v = $o(g) ? "w" : d && "\n" == g ? "n" : !d || /\s/.test(g) ? null : "p";
                        if (!d || p || v || (v = "s"), h && h != v) {
                            r < 0 && (r = 1, l());
                            break
                        }
                        if (v && (h = v), r > 0 && !l(!p)) break
                    }
                var m = fe(e, Ui(a, s), u, !0);
                return f || (m.hitSide = !0), m
            }

            function sr(e, t, r, n) {
                var i, o = e.doc,
                    l = t.left;
                if ("page" == n) {
                    var a = Math.min(e.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight);
                    i = t.top + r * (a - (r < 0 ? 1.5 : .5) * Ke(e.display))
                } else "line" == n && (i = r > 0 ? t.bottom + 3 : t.top - 3);
                for (;;) {
                    var s = Ve(e, l, i);
                    if (!s.outside) break;
                    if (r < 0 ? i <= 0 : i >= o.height) {
                        s.hitSide = !0;
                        break
                    }
                    i += 5 * r
                }
                return s
            }

            function ur(e, t) {
                var r = un(e, t.line).text,
                    n = t.ch,
                    i = t.ch;
                if (r) {
                    (t.xRel < 0 || i == r.length) && n ? --n : ++i;
                    for (var o = r.charAt(n), l = $o(o) ? $o : /\s/.test(o) ? function(e) {
                            return /\s/.test(e)
                        } : function(e) {
                            return !/\s/.test(e) && !$o(e)
                        }; n > 0 && l(r.charAt(n - 1));) --n;
                    for (; i < r.length && l(r.charAt(i));) ++i
                }
                return new _(Ui(t.line, n), Ui(t.line, i))
            }

            function cr(t, r, n, i) {
                e.defaults[t] = r, n && (io[t] = i ? function(e, t, r) {
                    r != oo && n(e, t, r)
                } : n)
            }

            function fr(e) {
                return "string" == typeof e ? go[e] : e
            }

            function hr(e, t, r, n, i) {
                if (n && n.shared) return dr(e, t, r, n, i);
                if (e.cm && !e.cm.curOp) return $e(e.cm, hr)(e, t, r, n, i);
                var o = new xo(e, i),
                    l = Ki(t, r);
                if (n && Yn(n, o), l > 0 || 0 == l && o.clearWhenEmpty !== !1) return o;
                if (o.replacedWith && (o.collapsed = !0, o.widgetNode = Qn("span", [o.replacedWith], "CodeMirror-widget"), n.handleMouseEvents || (o.widgetNode.ignoreEvents = !0), n.insertLeft && (o.widgetNode.insertLeft = !0)), o.collapsed) {
                    if (Wr(e, t.line, t, r, o) || t.line != r.line && Wr(e, r.line, t, r, o)) throw new Error("Inserting collapsed marker partially overlapping an existing one");
                    Vi = !0
                }
                o.addToHistory && wn(e, {
                    from: t,
                    to: r,
                    origin: "markText"
                }, e.sel, NaN);
                var a, s = t.line,
                    u = e.cm;
                if (e.iter(s, r.line + 1, function(e) {
                        u && o.collapsed && !u.options.lineWrapping && Dr(e) == u.display.maxLine && (a = !0), o.collapsed && s != t.line && hn(e, 0), mr(e, new pr(o, s == t.line ? t.ch : null, s == r.line ? r.ch : null)), ++s
                    }), o.collapsed && e.iter(t.line, r.line + 1, function(t) {
                        Rr(e, t) && hn(t, 0)
                    }), o.clearOnEnter && Eo(o, "beforeCursorEnter", function() {
                        o.clear()
                    }), o.readOnly && (Gi = !0, (e.history.done.length || e.history.undone.length) && e.clearHistory()), o.collapsed && (o.id = ++wo, o.atomic = !0), u) {
                    if (a && (u.curOp.updateMaxLine = !0), o.collapsed) et(u, t.line, r.line + 1);
                    else if (o.className || o.title || o.startStyle || o.endStyle)
                        for (var c = t.line; c <= r.line; c++) tt(u, c, "text");
                    o.atomic && ue(u.doc), En(u, "markerAdded", u, o)
                }
                return o
            }

            function dr(e, t, r, n, i) {
                n = Yn(n), n.shared = !1;
                var o = [hr(e, t, r, n, i)],
                    l = o[0],
                    a = n.widgetNode;
                return an(e, function(e) {
                    a && (n.widgetNode = a.cloneNode(!0)), o.push(hr(e, $(e, t), $(e, r), n, i));
                    for (var s = 0; s < e.linked.length; ++s)
                        if (e.linked[s].isParent) return;
                    l = Un(o)
                }), new Co(o, l)
            }

            function pr(e, t, r) {
                this.marker = e, this.from = t, this.to = r
            }

            function gr(e, t) {
                if (e)
                    for (var r = 0; r < e.length; ++r) {
                        var n = e[r];
                        if (n.marker == t) return n
                    }
            }

            function vr(e, t) {
                for (var r, n = 0; n < e.length; ++n) e[n] != t && (r || (r = [])).push(e[n]);
                return r
            }

            function mr(e, t) {
                e.markedSpans = e.markedSpans ? e.markedSpans.concat([t]) : [t], t.marker.attachLine(e)
            }

            function yr(e, t, r) {
                if (e)
                    for (var n, i = 0; i < e.length; ++i) {
                        var o = e[i],
                            l = o.marker,
                            a = null == o.from || (l.inclusiveLeft ? o.from <= t : o.from < t);
                        if (a || o.from == t && "bookmark" == l.type && (!r || !o.marker.insertLeft)) {
                            var s = null == o.to || (l.inclusiveRight ? o.to >= t : o.to > t);
                            (n || (n = [])).push(new pr(l, o.from, s ? null : o.to))
                        }
                    }
                return n
            }

            function br(e, t, r) {
                if (e)
                    for (var n, i = 0; i < e.length; ++i) {
                        var o = e[i],
                            l = o.marker,
                            a = null == o.to || (l.inclusiveRight ? o.to >= t : o.to > t);
                        if (a || o.from == t && "bookmark" == l.type && (!r || o.marker.insertLeft)) {
                            var s = null == o.from || (l.inclusiveLeft ? o.from <= t : o.from < t);
                            (n || (n = [])).push(new pr(l, s ? null : o.from - t, null == o.to ? null : o.to - t))
                        }
                    }
                return n
            }

            function xr(e, t) {
                var r = Z(e, t.from.line) && un(e, t.from.line).markedSpans,
                    n = Z(e, t.to.line) && un(e, t.to.line).markedSpans;
                if (!r && !n) return null;
                var i = t.from.ch,
                    o = t.to.ch,
                    l = 0 == Ki(t.from, t.to),
                    a = yr(r, i, l),
                    s = br(n, o, l),
                    u = 1 == t.text.length,
                    c = Un(t.text).length + (u ? i : 0);
                if (a)
                    for (var f = 0; f < a.length; ++f) {
                        var h = a[f];
                        if (null == h.to) {
                            var d = gr(s, h.marker);
                            d ? u && (h.to = null == d.to ? null : d.to + c) : h.to = i
                        }
                    }
                if (s)
                    for (var f = 0; f < s.length; ++f) {
                        var h = s[f];
                        if (null != h.to && (h.to += c), null == h.from) {
                            var d = gr(a, h.marker);
                            d || (h.from = c, u && (a || (a = [])).push(h))
                        } else h.from += c, u && (a || (a = [])).push(h)
                    }
                a && (a = wr(a)), s && s != a && (s = wr(s));
                var p = [a];
                if (!u) {
                    var g, v = t.text.length - 2;
                    if (v > 0 && a)
                        for (var f = 0; f < a.length; ++f) null == a[f].to && (g || (g = [])).push(new pr(a[f].marker, null, null));
                    for (var f = 0; f < v; ++f) p.push(g);
                    p.push(s)
                }
                return p
            }

            function wr(e) {
                for (var t = 0; t < e.length; ++t) {
                    var r = e[t];
                    null != r.from && r.from == r.to && r.marker.clearWhenEmpty !== !1 && e.splice(t--, 1)
                }
                return e.length ? e : null
            }

            function Cr(e, t) {
                var r = Tn(e, t),
                    n = xr(e, t);
                if (!r) return n;
                if (!n) return r;
                for (var i = 0; i < r.length; ++i) {
                    var o = r[i],
                        l = n[i];
                    if (o && l) e: for (var a = 0; a < l.length; ++a) {
                        for (var s = l[a], u = 0; u < o.length; ++u)
                            if (o[u].marker == s.marker) continue e;
                        o.push(s)
                    } else l && (r[i] = l)
                }
                return r
            }

            function Lr(e, t, r) {
                var n = null;
                if (e.iter(t.line, r.line + 1, function(e) {
                        if (e.markedSpans)
                            for (var t = 0; t < e.markedSpans.length; ++t) {
                                var r = e.markedSpans[t].marker;
                                !r.readOnly || n && Kn(n, r) != -1 || (n || (n = [])).push(r)
                            }
                    }), !n) return null;
                for (var i = [{
                        from: t,
                        to: r
                    }], o = 0; o < n.length; ++o)
                    for (var l = n[o], a = l.find(0), s = 0; s < i.length; ++s) {
                        var u = i[s];
                        if (!(Ki(u.to, a.from) < 0 || Ki(u.from, a.to) > 0)) {
                            var c = [s, 1],
                                f = Ki(u.from, a.from),
                                h = Ki(u.to, a.to);
                            (f < 0 || !l.inclusiveLeft && !f) && c.push({
                                from: u.from,
                                to: a.from
                            }), (h > 0 || !l.inclusiveRight && !h) && c.push({
                                from: a.to,
                                to: u.to
                            }), i.splice.apply(i, c), s += c.length - 1
                        }
                    }
                return i
            }

            function Sr(e) {
                var t = e.markedSpans;
                if (t) {
                    for (var r = 0; r < t.length; ++r) t[r].marker.detachLine(e);
                    e.markedSpans = null
                }
            }

            function kr(e, t) {
                if (t) {
                    for (var r = 0; r < t.length; ++r) t[r].marker.attachLine(e);
                    e.markedSpans = t
                }
            }

            function Mr(e) {
                return e.inclusiveLeft ? -1 : 0
            }

            function Tr(e) {
                return e.inclusiveRight ? 1 : 0
            }

            function Nr(e, t) {
                var r = e.lines.length - t.lines.length;
                if (0 != r) return r;
                var n = e.find(),
                    i = t.find(),
                    o = Ki(n.from, i.from) || Mr(e) - Mr(t);
                if (o) return -o;
                var l = Ki(n.to, i.to) || Tr(e) - Tr(t);
                return l ? l : t.id - e.id
            }

            function Or(e, t) {
                var r, n = Vi && e.markedSpans;
                if (n)
                    for (var i, o = 0; o < n.length; ++o) i = n[o], i.marker.collapsed && null == (t ? i.from : i.to) && (!r || Nr(r, i.marker) < 0) && (r = i.marker);
                return r
            }

            function Hr(e) {
                return Or(e, !0)
            }

            function Ar(e) {
                return Or(e, !1)
            }

            function Wr(e, t, r, n, i) {
                var o = un(e, t),
                    l = Vi && o.markedSpans;
                if (l)
                    for (var a = 0; a < l.length; ++a) {
                        var s = l[a];
                        if (s.marker.collapsed) {
                            var u = s.marker.find(0),
                                c = Ki(u.from, r) || Mr(s.marker) - Mr(i),
                                f = Ki(u.to, n) || Tr(s.marker) - Tr(i);
                            if (!(c >= 0 && f <= 0 || c <= 0 && f >= 0) && (c <= 0 && (Ki(u.to, r) || Tr(s.marker) - Mr(i)) > 0 || c >= 0 && (Ki(u.from, n) || Mr(s.marker) - Tr(i)) < 0)) return !0
                        }
                    }
            }

            function Dr(e) {
                for (var t; t = Hr(e);) e = t.find(-1, !0).line;
                return e
            }

            function Ir(e) {
                for (var t, r; t = Ar(e);) e = t.find(1, !0).line, (r || (r = [])).push(e);
                return r
            }

            function Er(e, t) {
                var r = un(e, t),
                    n = Dr(r);
                return r == n ? t : dn(n)
            }

            function zr(e, t) {
                if (t > e.lastLine()) return t;
                var r, n = un(e, t);
                if (!Rr(e, n)) return t;
                for (; r = Ar(n);) n = r.find(1, !0).line;
                return dn(n) + 1
            }

            function Rr(e, t) {
                var r = Vi && t.markedSpans;
                if (r)
                    for (var n, i = 0; i < r.length; ++i)
                        if (n = r[i], n.marker.collapsed) {
                            if (null == n.from) return !0;
                            if (!n.marker.widgetNode && 0 == n.from && n.marker.inclusiveLeft && Pr(e, t, n)) return !0;
                        }
            }

            function Pr(e, t, r) {
                if (null == r.to) {
                    var n = r.marker.find(1, !0);
                    return Pr(e, n.line, gr(n.line.markedSpans, r.marker))
                }
                if (r.marker.inclusiveRight && r.to == t.text.length) return !0;
                for (var i, o = 0; o < t.markedSpans.length; ++o)
                    if (i = t.markedSpans[o], i.marker.collapsed && !i.marker.widgetNode && i.from == r.to && (null == i.to || i.to != r.from) && (i.marker.inclusiveLeft || r.marker.inclusiveRight) && Pr(e, t, i)) return !0
            }

            function Fr(e, t, r) {
                gn(t) < (e.curOp && e.curOp.scrollTop || e.doc.scrollTop) && tr(e, null, r)
            }

            function Br(e) {
                return null != e.height ? e.height : (ti(document.body, e.node) || ei(e.cm.display.measure, Qn("div", [e.node], null, "position: relative")), e.height = e.node.offsetHeight)
            }

            function Gr(e, t, r, n) {
                var i = new Lo(e, r, n);
                return i.noHScroll && (e.display.alignWidgets = !0), or(e, t, "widget", function(t) {
                    var r = t.widgets || (t.widgets = []);
                    if (null == i.insertAt ? r.push(i) : r.splice(Math.min(r.length - 1, Math.max(0, i.insertAt)), 0, i), i.line = t, !Rr(e.doc, t)) {
                        var n = gn(t) < e.doc.scrollTop;
                        hn(t, t.height + Br(i)), n && tr(e, null, i.height), e.curOp.forceUpdate = !0
                    }
                    return !0
                }), i
            }

            function Vr(e, t, r, n) {
                e.text = t, e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null), null != e.order && (e.order = null), Sr(e), kr(e, r);
                var i = n ? n(e) : 1;
                i != e.height && hn(e, i)
            }

            function Ur(e) {
                e.parent = null, Sr(e)
            }

            function Kr(t, r, n, i, o, l) {
                var a = n.flattenSpans;
                null == a && (a = t.options.flattenSpans);
                var s, u = 0,
                    c = null,
                    f = new bo(r, t.options.tabSize);
                for ("" == r && n.blankLine && n.blankLine(i); !f.eol();) {
                    if (f.pos > t.options.maxHighlightLength ? (a = !1, l && Yr(t, r, i, f.pos), f.pos = r.length, s = null) : s = n.token(f, i), t.options.addModeClass) {
                        var h = e.innerMode(n, i).mode.name;
                        h && (s = "m-" + (s ? h + " " + s : h))
                    }
                    a && c == s || (u < f.start && o(f.start, c), u = f.start, c = s), f.start = f.pos
                }
                for (; u < f.pos;) {
                    var d = Math.min(f.pos, u + 5e4);
                    o(d, c), u = d
                }
            }

            function _r(e, t, r, n) {
                var i = [e.state.modeGen];
                Kr(e, t.text, e.doc.mode, r, function(e, t) {
                    i.push(e, t)
                }, n);
                for (var o = 0; o < e.state.overlays.length; ++o) {
                    var l = e.state.overlays[o],
                        a = 1,
                        s = 0;
                    Kr(e, t.text, l.mode, !0, function(e, t) {
                        for (var r = a; s < e;) {
                            var n = i[a];
                            n > e && i.splice(a, 1, e, i[a + 1], n), a += 2, s = Math.min(e, n)
                        }
                        if (t)
                            if (l.opaque) i.splice(r, a - r, e, t), a = r + 2;
                            else
                                for (; r < a; r += 2) {
                                    var o = i[r + 1];
                                    i[r + 1] = o ? o + " " + t : t
                                }
                    })
                }
                return i
            }

            function Xr(e, t) {
                return t.styles && t.styles[0] == e.state.modeGen || (t.styles = _r(e, t, t.stateAfter = be(e, dn(t)))), t.styles
            }

            function Yr(e, t, r, n) {
                var i = e.doc.mode,
                    o = new bo(t, e.options.tabSize);
                for (o.start = o.pos = n || 0, "" == t && i.blankLine && i.blankLine(r); !o.eol() && o.pos <= e.options.maxHighlightLength;) i.token(o, r), o.start = o.pos
            }

            function jr(e, t) {
                if (!e) return null;
                for (;;) {
                    var r = e.match(/(?:^|\s+)line-(background-)?(\S+)/);
                    if (!r) break;
                    e = e.slice(0, r.index) + e.slice(r.index + r[0].length);
                    var n = r[1] ? "bgClass" : "textClass";
                    null == t[n] ? t[n] = r[2] : new RegExp("(?:^|s)" + r[2] + "(?:$|s)").test(t[n]) || (t[n] += " " + r[2])
                }
                if (/^\s*$/.test(e)) return null;
                var i = t.cm.options.addModeClass ? Mo : ko;
                return i[e] || (i[e] = e.replace(/\S+/g, "cm-$&"))
            }

            function $r(e, t) {
                var r = Qn("span", null, null, ki ? "padding-right: .1px" : null),
                    n = {
                        pre: Qn("pre", [r]),
                        content: r,
                        col: 0,
                        pos: 0,
                        cm: e
                    };
                t.measure = {};
                for (var i = 0; i <= (t.rest ? t.rest.length : 0); i++) {
                    var o, l = i ? t.rest[i - 1] : t.line;
                    n.pos = 0, n.addToken = Zr, (Si || ki) && e.getOption("lineWrapping") && (n.addToken = Qr(n.addToken)), oi(e.display.measure) && (o = vn(l)) && (n.addToken = Jr(n.addToken, o)), n.map = [], tn(l, n, Xr(e, l)), 0 == n.map.length && n.map.push(0, 0, n.content.appendChild(ii(e.display.measure))), 0 == i ? (t.measure.map = n.map, t.measure.cache = {}) : ((t.measure.maps || (t.measure.maps = [])).push(n.map), (t.measure.caches || (t.measure.caches = [])).push({}))
                }
                return Ro(e, "renderLine", e, t.line, n.pre), n
            }

            function qr(e) {
                var t = Qn("span", "•", "cm-invalidchar");
                return t.title = "\\u" + e.charCodeAt(0).toString(16), t
            }

            function Zr(e, t, r, n, i, o) {
                if (t) {
                    var l = e.cm.options.specialChars,
                        a = !1;
                    if (l.test(t))
                        for (var s = document.createDocumentFragment(), u = 0;;) {
                            l.lastIndex = u;
                            var c = l.exec(t),
                                f = c ? c.index - u : t.length - u;
                            if (f) {
                                var h = document.createTextNode(t.slice(u, u + f));
                                wi ? s.appendChild(Qn("span", [h])) : s.appendChild(h), e.map.push(e.pos, e.pos + f, h), e.col += f, e.pos += f
                            }
                            if (!c) break;
                            if (u += f + 1, "\t" == c[0]) {
                                var d = e.cm.options.tabSize,
                                    p = d - e.col % d,
                                    h = s.appendChild(Qn("span", Vn(p), "cm-tab"));
                                e.col += p
                            } else {
                                var h = e.cm.options.specialCharPlaceholder(c[0]);
                                wi ? s.appendChild(Qn("span", [h])) : s.appendChild(h), e.col += 1
                            }
                            e.map.push(e.pos, e.pos + 1, h), e.pos++
                        } else {
                            e.col += t.length;
                            var s = document.createTextNode(t);
                            e.map.push(e.pos, e.pos + t.length, s), wi && (a = !0), e.pos += t.length
                        }
                    if (r || n || i || a) {
                        var g = r || "";
                        n && (g += n), i && (g += i);
                        var v = Qn("span", [s], g);
                        return o && (v.title = o), e.content.appendChild(v)
                    }
                    e.content.appendChild(s)
                }
            }

            function Qr(e) {
                function t(e) {
                    for (var t = " ", r = 0; r < e.length - 2; ++r) t += r % 2 ? " " : " ";
                    return t += " "
                }
                return function(r, n, i, o, l, a) {
                    e(r, n.replace(/ {3,}/g, t), i, o, l, a)
                }
            }

            function Jr(e, t) {
                return function(r, n, i, o, l, a) {
                    i = i ? i + " cm-force-border" : "cm-force-border";
                    for (var s = r.pos, u = s + n.length;;) {
                        for (var c = 0; c < t.length; c++) {
                            var f = t[c];
                            if (f.to > s && f.from <= s) break
                        }
                        if (f.to >= u) return e(r, n, i, o, l, a);
                        e(r, n.slice(0, f.to - s), i, o, null, a), o = null, n = n.slice(f.to - s), s = f.to
                    }
                }
            }

            function en(e, t, r, n) {
                var i = !n && r.widgetNode;
                i && (e.map.push(e.pos, e.pos + t, i), e.content.appendChild(i)), e.pos += t
            }

            function tn(e, t, r) {
                var n = e.markedSpans,
                    i = e.text,
                    o = 0;
                if (n)
                    for (var l, a, s, u, c, f, h = i.length, d = 0, p = 1, g = "", v = 0;;) {
                        if (v == d) {
                            a = s = u = c = "", f = null, v = 1 / 0;
                            for (var m = [], y = 0; y < n.length; ++y) {
                                var b = n[y],
                                    x = b.marker;
                                b.from <= d && (null == b.to || b.to > d) ? (null != b.to && v > b.to && (v = b.to, s = ""), x.className && (a += " " + x.className), x.startStyle && b.from == d && (u += " " + x.startStyle), x.endStyle && b.to == v && (s += " " + x.endStyle), x.title && !c && (c = x.title), x.collapsed && (!f || Nr(f.marker, x) < 0) && (f = b)) : b.from > d && v > b.from && (v = b.from), "bookmark" == x.type && b.from == d && x.widgetNode && m.push(x)
                            }
                            if (f && (f.from || 0) == d && (en(t, (null == f.to ? h + 1 : f.to) - d, f.marker, null == f.from), null == f.to)) return;
                            if (!f && m.length)
                                for (var y = 0; y < m.length; ++y) en(t, 0, m[y])
                        }
                        if (d >= h) break;
                        for (var w = Math.min(h, v);;) {
                            if (g) {
                                var C = d + g.length;
                                if (!f) {
                                    var L = C > w ? g.slice(0, w - d) : g;
                                    t.addToken(t, L, l ? l + a : a, u, d + L.length == v ? s : "", c)
                                }
                                if (C >= w) {
                                    g = g.slice(w - d), d = w;
                                    break
                                }
                                d = C, u = ""
                            }
                            g = i.slice(o, o = r[p++]), l = jr(r[p++], t)
                        }
                    } else
                        for (var p = 1; p < r.length; p += 2) t.addToken(t, i.slice(o, o = r[p]), jr(r[p + 1], t))
            }

            function rn(e, t) {
                return 0 == t.from.ch && 0 == t.to.ch && "" == Un(t.text) && (!e.cm || e.cm.options.wholeLineUpdateBefore)
            }

            function nn(e, t, r, n) {
                function i(e) {
                    return r ? r[e] : null
                }

                function o(e, r, i) {
                    Vr(e, r, i, n), En(e, "change", e, t)
                }
                var l = t.from,
                    a = t.to,
                    s = t.text,
                    u = un(e, l.line),
                    c = un(e, a.line),
                    f = Un(s),
                    h = i(s.length - 1),
                    d = a.line - l.line;
                if (rn(e, t)) {
                    for (var p = 0, g = []; p < s.length - 1; ++p) g.push(new So(s[p], i(p), n));
                    o(c, c.text, h), d && e.remove(l.line, d), g.length && e.insert(l.line, g)
                } else if (u == c)
                    if (1 == s.length) o(u, u.text.slice(0, l.ch) + f + u.text.slice(a.ch), h);
                    else {
                        for (var g = [], p = 1; p < s.length - 1; ++p) g.push(new So(s[p], i(p), n));
                        g.push(new So(f + u.text.slice(a.ch), h, n)), o(u, u.text.slice(0, l.ch) + s[0], i(0)), e.insert(l.line + 1, g)
                    } else if (1 == s.length) o(u, u.text.slice(0, l.ch) + s[0] + c.text.slice(a.ch), i(0)), e.remove(l.line + 1, d);
                else {
                    o(u, u.text.slice(0, l.ch) + s[0], i(0)), o(c, f + c.text.slice(a.ch), h);
                    for (var p = 1, g = []; p < s.length - 1; ++p) g.push(new So(s[p], i(p), n));
                    d > 1 && e.remove(l.line + 1, d - 1), e.insert(l.line + 1, g)
                }
                En(e, "change", e, t)
            }

            function on(e) {
                this.lines = e, this.parent = null;
                for (var t = 0, r = 0; t < e.length; ++t) e[t].parent = this, r += e[t].height;
                this.height = r
            }

            function ln(e) {
                this.children = e;
                for (var t = 0, r = 0, n = 0; n < e.length; ++n) {
                    var i = e[n];
                    t += i.chunkSize(), r += i.height, i.parent = this
                }
                this.size = t, this.height = r, this.parent = null
            }

            function an(e, t, r) {
                function n(e, i, o) {
                    if (e.linked)
                        for (var l = 0; l < e.linked.length; ++l) {
                            var a = e.linked[l];
                            if (a.doc != i) {
                                var s = o && a.sharedHist;
                                r && !s || (t(a.doc, s), n(a.doc, e, s))
                            }
                        }
                }
                n(e, null, !0)
            }

            function sn(e, t) {
                if (t.cm) throw new Error("This document is already in use.");
                e.doc = t, t.cm = e, l(e), r(e), e.options.lineWrapping || h(e), e.options.mode = t.modeOption, et(e)
            }

            function un(e, t) {
                if (t -= e.first, t < 0 || t >= e.size) throw new Error("There is no line " + (t + e.first) + " in the document.");
                for (var r = e; !r.lines;)
                    for (var n = 0;; ++n) {
                        var i = r.children[n],
                            o = i.chunkSize();
                        if (t < o) {
                            r = i;
                            break
                        }
                        t -= o
                    }
                return r.lines[t]
            }

            function cn(e, t, r) {
                var n = [],
                    i = t.line;
                return e.iter(t.line, r.line + 1, function(e) {
                    var o = e.text;
                    i == r.line && (o = o.slice(0, r.ch)), i == t.line && (o = o.slice(t.ch)), n.push(o), ++i
                }), n
            }

            function fn(e, t, r) {
                var n = [];
                return e.iter(t, r, function(e) {
                    n.push(e.text)
                }), n
            }

            function hn(e, t) {
                var r = t - e.height;
                if (r)
                    for (var n = e; n; n = n.parent) n.height += r
            }

            function dn(e) {
                if (null == e.parent) return null;
                for (var t = e.parent, r = Kn(t.lines, e), n = t.parent; n; t = n, n = n.parent)
                    for (var i = 0; n.children[i] != t; ++i) r += n.children[i].chunkSize();
                return r + t.first
            }

            function pn(e, t) {
                var r = e.first;
                e: do {
                    for (var n = 0; n < e.children.length; ++n) {
                        var i = e.children[n],
                            o = i.height;
                        if (t < o) {
                            e = i;
                            continue e
                        }
                        t -= o, r += i.chunkSize()
                    }
                    return r
                } while (!e.lines);
                for (var n = 0; n < e.lines.length; ++n) {
                    var l = e.lines[n],
                        a = l.height;
                    if (t < a) break;
                    t -= a
                }
                return r + n
            }

            function gn(e) {
                e = Dr(e);
                for (var t = 0, r = e.parent, n = 0; n < r.lines.length; ++n) {
                    var i = r.lines[n];
                    if (i == e) break;
                    t += i.height
                }
                for (var o = r.parent; o; r = o, o = r.parent)
                    for (var n = 0; n < o.children.length; ++n) {
                        var l = o.children[n];
                        if (l == r) break;
                        t += l.height
                    }
                return t
            }

            function vn(e) {
                var t = e.order;
                return null == t && (t = e.order = al(e.text)), t
            }

            function mn(e) {
                this.done = [], this.undone = [], this.undoDepth = 1 / 0, this.lastModTime = this.lastSelTime = 0, this.lastOp = null, this.lastOrigin = this.lastSelOrigin = null, this.generation = this.maxGeneration = e || 1
            }

            function yn(e, t) {
                var r = {
                    from: G(t.from),
                    to: ro(t),
                    text: cn(e, t.from, t.to)
                };
                return kn(e, r, t.from.line, t.to.line + 1), an(e, function(e) {
                    kn(e, r, t.from.line, t.to.line + 1)
                }, !0), r
            }

            function bn(e) {
                for (; e.length;) {
                    var t = Un(e);
                    if (!t.ranges) break;
                    e.pop()
                }
            }

            function xn(e, t) {
                return t ? (bn(e.done), Un(e.done)) : e.done.length && !Un(e.done).ranges ? Un(e.done) : e.done.length > 1 && !e.done[e.done.length - 2].ranges ? (e.done.pop(), Un(e.done)) : void 0
            }

            function wn(e, t, r, n) {
                var i = e.history;
                i.undone.length = 0;
                var o, l = +new Date;
                if ((i.lastOp == n || i.lastOrigin == t.origin && t.origin && ("+" == t.origin.charAt(0) && e.cm && i.lastModTime > l - e.cm.options.historyEventDelay || "*" == t.origin.charAt(0))) && (o = xn(i, i.lastOp == n))) {
                    var a = Un(o.changes);
                    0 == Ki(t.from, t.to) && 0 == Ki(t.from, a.to) ? a.to = ro(t) : o.changes.push(yn(e, t))
                } else {
                    var s = Un(i.done);
                    for (s && s.ranges || Sn(e.sel, i.done), o = {
                            changes: [yn(e, t)],
                            generation: i.generation
                        }, i.done.push(o); i.done.length > i.undoDepth;) i.done.shift(), i.done[0].ranges || i.done.shift()
                }
                i.done.push(r), i.generation = ++i.maxGeneration, i.lastModTime = i.lastSelTime = l, i.lastOp = n, i.lastOrigin = i.lastSelOrigin = t.origin, a || Ro(e, "historyAdded")
            }

            function Cn(e, t, r, n) {
                var i = t.charAt(0);
                return "*" == i || "+" == i && r.ranges.length == n.ranges.length && r.somethingSelected() == n.somethingSelected() && new Date - e.history.lastSelTime <= (e.cm ? e.cm.options.historyEventDelay : 500)
            }

            function Ln(e, t, r, n) {
                var i = e.history,
                    o = n && n.origin;
                r == i.lastOp || o && i.lastSelOrigin == o && (i.lastModTime == i.lastSelTime && i.lastOrigin == o || Cn(e, o, Un(i.done), t)) ? i.done[i.done.length - 1] = t : Sn(t, i.done), i.lastSelTime = +new Date, i.lastSelOrigin = o, i.lastOp = r, n && n.clearRedo !== !1 && bn(i.undone)
            }

            function Sn(e, t) {
                var r = Un(t);
                r && r.ranges && r.equals(e) || t.push(e)
            }

            function kn(e, t, r, n) {
                var i = t["spans_" + e.id],
                    o = 0;
                e.iter(Math.max(e.first, r), Math.min(e.first + e.size, n), function(r) {
                    r.markedSpans && ((i || (i = t["spans_" + e.id] = {}))[o] = r.markedSpans), ++o
                })
            }

            function Mn(e) {
                if (!e) return null;
                for (var t, r = 0; r < e.length; ++r) e[r].marker.explicitlyCleared ? t || (t = e.slice(0, r)) : t && t.push(e[r]);
                return t ? t.length ? t : null : e
            }

            function Tn(e, t) {
                var r = t["spans_" + e.id];
                if (!r) return null;
                for (var n = 0, i = []; n < t.text.length; ++n) i.push(Mn(r[n]));
                return i
            }

            function Nn(e, t, r) {
                for (var n = 0, i = []; n < e.length; ++n) {
                    var o = e[n];
                    if (o.ranges) i.push(r ? K.prototype.deepCopy.call(o) : o);
                    else {
                        var l = o.changes,
                            a = [];
                        i.push({
                            changes: a
                        });
                        for (var s = 0; s < l.length; ++s) {
                            var u, c = l[s];
                            if (a.push({
                                    from: c.from,
                                    to: c.to,
                                    text: c.text
                                }), t)
                                for (var f in c)(u = f.match(/^spans_(\d+)$/)) && Kn(t, Number(u[1])) > -1 && (Un(a)[f] = c[f], delete c[f])
                        }
                    }
                }
                return i
            }

            function On(e, t, r, n) {
                r < e.line ? e.line += n : t < e.line && (e.line = t, e.ch = 0)
            }

            function Hn(e, t, r, n) {
                for (var i = 0; i < e.length; ++i) {
                    var o = e[i],
                        l = !0;
                    if (o.ranges) {
                        o.copied || (o = e[i] = o.deepCopy(), o.copied = !0);
                        for (var a = 0; a < o.ranges.length; a++) On(o.ranges[a].anchor, t, r, n), On(o.ranges[a].head, t, r, n)
                    } else {
                        for (var a = 0; a < o.changes.length; ++a) {
                            var s = o.changes[a];
                            if (r < s.from.line) s.from = Ui(s.from.line + n, s.from.ch), s.to = Ui(s.to.line + n, s.to.ch);
                            else if (t <= s.to.line) {
                                l = !1;
                                break
                            }
                        }
                        l || (e.splice(0, i + 1), i = 0)
                    }
                }
            }

            function An(e, t) {
                var r = t.from.line,
                    n = t.to.line,
                    i = t.text.length - (n - r) - 1;
                Hn(e.done, r, n, i), Hn(e.undone, r, n, i)
            }

            function Wn(e) {
                return null != e.defaultPrevented ? e.defaultPrevented : 0 == e.returnValue
            }

            function Dn(e) {
                return e.target || e.srcElement
            }

            function In(e) {
                var t = e.which;
                return null == t && (1 & e.button ? t = 1 : 2 & e.button ? t = 3 : 4 & e.button && (t = 2)), zi && e.ctrlKey && 1 == t && (t = 3), t
            }

            function En(e, t) {
                function r(e) {
                    return function() {
                        e.apply(null, i)
                    }
                }
                var n = e._handlers && e._handlers[t];
                if (n) {
                    var i = Array.prototype.slice.call(arguments, 2);
                    Ao || (++Po, Ao = [], setTimeout(zn, 0));
                    for (var o = 0; o < n.length; ++o) Ao.push(r(n[o]))
                }
            }

            function zn() {
                --Po;
                var e = Ao;
                Ao = null;
                for (var t = 0; t < e.length; ++t) e[t]()
            }

            function Rn(e, t, r) {
                return Ro(e, r || t.type, e, t), Wn(t) || t.codemirrorIgnore
            }

            function Pn(e, t) {
                var r = e._handlers && e._handlers[t];
                return r && r.length > 0
            }

            function Fn(e) {
                e.prototype.on = function(e, t) {
                    Eo(this, e, t)
                }, e.prototype.off = function(e, t) {
                    zo(this, e, t)
                }
            }

            function Bn() {
                this.id = null
            }

            function Gn(e, t, r) {
                for (var n = 0, i = 0;;) {
                    var o = e.indexOf("\t", n);
                    o == -1 && (o = e.length);
                    var l = o - n;
                    if (o == e.length || i + l >= t) return n + Math.min(l, t - i);
                    if (i += o - n, i += r - i % r, n = o + 1, i >= t) return n
                }
            }

            function Vn(e) {
                for (; _o.length <= e;) _o.push(Un(_o) + " ");
                return _o[e]
            }

            function Un(e) {
                return e[e.length - 1]
            }

            function Kn(e, t) {
                for (var r = 0; r < e.length; ++r)
                    if (e[r] == t) return r;
                return -1
            }

            function _n(e, t) {
                for (var r = [], n = 0; n < e.length; n++) r[n] = t(e[n], n);
                return r
            }

            function Xn(e, t) {
                var r;
                if (Object.create) r = Object.create(e);
                else {
                    var n = function() {};
                    n.prototype = e, r = new n
                }
                return t && Yn(t, r), r
            }

            function Yn(e, t) {
                t || (t = {});
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
                return t
            }

            function jn(e) {
                var t = Array.prototype.slice.call(arguments, 1);
                return function() {
                    return e.apply(null, t)
                }
            }

            function $n(e) {
                for (var t in e)
                    if (e.hasOwnProperty(t) && e[t]) return !1;
                return !0
            }

            function qn(e) {
                return e.charCodeAt(0) >= 768 && qo.test(e)
            }

            function Zn(e) {
                function t(e) {
                    return e = e.trim(), e.length < 4 ? null : e.length < 7 ? [17 * parseInt(e.charAt(1), 16), 17 * parseInt(e.charAt(2), 16), 17 * parseInt(e.charAt(3), 16)] : [parseInt(e.substr(1, 2), 16), parseInt(e.substr(3, 2), 16), parseInt(e.substr(5, 2), 16)]
                }

                function r(e) {
                    var t = e[0],
                        r = e[1],
                        n = e[2],
                        i = [t, r, n].map(function(e) {
                            return e /= 255, e <= .03928 ? e / 12.92 : Math.pow((e + .055) / 1.055, 2.4)
                        });
                    return .2126 * i[0] + .7152 * i[1] + .0722 * i[2]
                }

                function n(e) {
                    return (r(e) + .05) / (a + .05)
                }

                function i(e) {
                    var t = e[0],
                        r = e[1],
                        n = e[2];
                    t /= 255, r /= 255, n /= 255;
                    var i, o, l = Math.max(t, r, n),
                        a = Math.min(t, r, n),
                        s = (l + a) / 2;
                    if (l == a) i = o = 0;
                    else {
                        var u = l - a;
                        switch (o = s > .5 ? u / (2 - l - a) : u / (l + a), l) {
                            case t:
                                i = (r - n) / u + (r < n ? 6 : 0);
                                break;
                            case r:
                                i = (n - t) / u + 2;
                                break;
                            case n:
                                i = (t - r) / u + 4
                        }
                        i /= 6
                    }
                    return [i, o, s]
                }

                function o(e) {
                    function t(e, t, r) {
                        return r < 0 && (r += 1), r > 1 && (r -= 1), r < 1 / 6 ? e + 6 * (t - e) * r : r < .5 ? t : r < 2 / 3 ? e + (t - e) * (2 / 3 - r) * 6 : e
                    }
                    var r, n, i, o = e[0],
                        l = e[1],
                        a = e[2];
                    if (0 == l) r = n = i = a;
                    else {
                        var s = a < .5 ? a * (1 + l) : a + l - a * l,
                            u = 2 * a - s;
                        r = t(u, s, o + 1 / 3), n = t(u, s, o), i = t(u, s, o - 1 / 3)
                    }
                    return [255 * r, 255 * n, 255 * i]
                }
                var l, a = r(t("#0F192A")),
                    s = e;
                if (Zo[s]) l = Zo[s];
                else {
                    var u = t(s);
                    if (u) {
                        var c = n(u);
                        if (c < 2.361) {
                            var f = i(u);
                            do f[2] += .01, c = n(o(f)); while (c < 2.361);
                            l = "color: hsl(" + ~~(360 * f[0]) + "," + ~~(100 * f[1]) + "%," + ~~(100 * f[2]) + "%)"
                        } else l = "color:" + s
                    }
                    Zo[s] = l
                }
                return l
            }

            function Qn(e, t, r, n) {
                var i = document.createElement(e);
                if (r) {
                    if (0 === r.indexOf("cm-MULTICOLOR")) r = "cm-COLOR", n = Zn(t[0].textContent);
                    else if (r.indexOf("cm-COLOR-#") !== -1) {
                        var o = r.match(/cm-COLOR-(#[0-9a-fA-F]+)/)[1];
                        n = Zn(o)
                    }
                    i.className = r
                }
                if (n && (i.style.cssText = n), "string" == typeof t) i.appendChild(document.createTextNode(t));
                else if (t)
                    for (var l = 0; l < t.length; ++l) i.appendChild(t[l]);
                return i
            }

            function Jn(e) {
                for (var t = e.childNodes.length; t > 0; --t) e.removeChild(e.firstChild);
                return e
            }

            function ei(e, t) {
                return Jn(e).appendChild(t)
            }

            function ti(e, t) {
                if (e.contains) return e.contains(t);
                for (; t = t.parentNode;)
                    if (t == e) return !0
            }

            function ri() {
                return document.activeElement
            }

            function ni(e) {
                if (null != Qo) return Qo;
                var t = Qn("div", null, null, "width: 50px; height: 50px; overflow-x: scroll");
                return ei(e, t), t.offsetWidth && (Qo = t.offsetHeight - t.clientHeight), Qo || 0
            }

            function ii(e) {
                if (null == Jo) {
                    var t = Qn("span", "​");
                    ei(e, Qn("span", [t, document.createTextNode("x")])), 0 != e.firstChild.offsetHeight && (Jo = t.offsetWidth <= 1 && t.offsetHeight > 2 && !xi)
                }
                return Jo ? Qn("span", "​") : Qn("span", " ", null, "display: inline-block; width: 1px; margin-right: -1px")
            }

            function oi(e) {
                if (null != el) return el;
                var t = ei(e, document.createTextNode("AخA")),
                    r = Yo(t, 0, 1).getBoundingClientRect();
                if (r.left == r.right) return !1;
                var n = Yo(t, 1, 2).getBoundingClientRect();
                return el = n.right - r.right < 3
            }

            function li(e, t, r, n) {
                if (!e) return n(t, r, "ltr");
                for (var i = !1, o = 0; o < e.length; ++o) {
                    var l = e[o];
                    (l.from < r && l.to > t || t == r && l.to == t) && (n(Math.max(l.from, t), Math.min(l.to, r), 1 == l.level ? "rtl" : "ltr"), i = !0)
                }
                i || n(t, r, "ltr")
            }

            function ai(e) {
                return e.level % 2 ? e.to : e.from
            }

            function si(e) {
                return e.level % 2 ? e.from : e.to
            }

            function ui(e) {
                var t = vn(e);
                return t ? ai(t[0]) : 0
            }

            function ci(e) {
                var t = vn(e);
                return t ? si(Un(t)) : e.text.length
            }

            function fi(e, t) {
                var r = un(e.doc, t),
                    n = Dr(r);
                n != r && (t = dn(n));
                var i = vn(n),
                    o = i ? i[0].level % 2 ? ci(n) : ui(n) : 0;
                return Ui(t, o)
            }

            function hi(e, t) {
                for (var r, n = un(e.doc, t); r = Ar(n);) n = r.find(1, !0).line, t = null;
                var i = vn(n),
                    o = i ? i[0].level % 2 ? ui(n) : ci(n) : n.text.length;
                return Ui(null == t ? dn(n) : t, o)
            }

            function di(e, t, r) {
                var n = e[0].level;
                return t == n || r != n && t < r
            }

            function pi(e, t) {
                ll = null;
                for (var r, n = 0; n < e.length; ++n) {
                    var i = e[n];
                    if (i.from < t && i.to > t) return n;
                    if (i.from == t || i.to == t) {
                        if (null != r) return di(e, i.level, e[r].level) ? (i.from != i.to && (ll = r), n) : (i.from != i.to && (ll = n), r);
                        r = n
                    }
                }
                return r
            }

            function gi(e, t, r, n) {
                if (!n) return t + r;
                do t += r; while (t > 0 && qn(e.text.charAt(t)));
                return t
            }

            function vi(e, t, r, n) {
                var i = vn(e);
                if (!i) return mi(e, t, r, n);
                for (var o = pi(i, t), l = i[o], a = gi(e, t, l.level % 2 ? -r : r, n);;) {
                    if (a > l.from && a < l.to) return a;
                    if (a == l.from || a == l.to) return pi(i, a) == o ? a : (l = i[o += r], r > 0 == l.level % 2 ? l.to : l.from);
                    if (l = i[o += r], !l) return null;
                    a = r > 0 == l.level % 2 ? gi(e, l.to, -1, n) : gi(e, l.from, 1, n)
                }
            }

            function mi(e, t, r, n) {
                var i = t + r;
                if (n)
                    for (; i > 0 && qn(e.text.charAt(i));) i += r;
                return i < 0 || i > e.text.length ? null : i
            }
            var yi = /gecko\/\d/i.test(navigator.userAgent),
                bi = /MSIE \d/.test(navigator.userAgent),
                xi = bi && (null == document.documentMode || document.documentMode < 8),
                wi = bi && (null == document.documentMode || document.documentMode < 9),
                Ci = bi && (null == document.documentMode || document.documentMode < 10),
                Li = /Trident\/([7-9]|\d{2,})\./.test(navigator.userAgent),
                Si = bi || Li,
                ki = /WebKit\//.test(navigator.userAgent),
                Mi = ki && /Qt\/\d+\.\d+/.test(navigator.userAgent),
                Ti = /Chrome\//.test(navigator.userAgent),
                Ni = /Opera\//.test(navigator.userAgent),
                Oi = /Apple Computer/.test(navigator.vendor),
                Hi = /KHTML\//.test(navigator.userAgent),
                Ai = /Mac OS X 1\d\D([7-9]|\d\d)\D/.test(navigator.userAgent),
                Wi = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(navigator.userAgent),
                Di = /PhantomJS/.test(navigator.userAgent),
                Ii = /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent),
                Ei = Ii || /Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(navigator.userAgent),
                zi = Ii || /Mac/.test(navigator.platform),
                Ri = /win/i.test(navigator.platform),
                Pi = Ni && navigator.userAgent.match(/Version\/(\d*\.\d*)/);
            Pi && (Pi = Number(Pi[1])), Pi && Pi >= 15 && (Ni = !1, ki = !0);
            var Fi = zi && (Mi || Ni && (null == Pi || Pi < 12.11)),
                Bi = yi || Si && !wi,
                Gi = !1,
                Vi = !1,
                Ui = e.Pos = function(e, t) {
                    return this instanceof Ui ? (this.line = e, void(this.ch = t)) : new Ui(e, t)
                },
                Ki = e.cmpPos = function(e, t) {
                    return e.line - t.line || e.ch - t.ch
                };
            K.prototype = {
                primary: function() {
                    return this.ranges[this.primIndex]
                },
                equals: function(e) {
                    if (e == this) return !0;
                    if (e.primIndex != this.primIndex || e.ranges.length != this.ranges.length) return !1;
                    for (var t = 0; t < this.ranges.length; t++) {
                        var r = this.ranges[t],
                            n = e.ranges[t];
                        if (0 != Ki(r.anchor, n.anchor) || 0 != Ki(r.head, n.head)) return !1
                    }
                    return !0
                },
                deepCopy: function() {
                    for (var e = [], t = 0; t < this.ranges.length; t++) e[t] = new _(G(this.ranges[t].anchor), G(this.ranges[t].head));
                    return new K(e, this.primIndex)
                },
                somethingSelected: function() {
                    for (var e = 0; e < this.ranges.length; e++)
                        if (!this.ranges[e].empty()) return !0;
                    return !1
                },
                contains: function(e, t) {
                    t || (t = e);
                    for (var r = 0; r < this.ranges.length; r++) {
                        var n = this.ranges[r];
                        if (Ki(t, n.from()) >= 0 && Ki(e, n.to()) <= 0) return r
                    }
                    return -1
                }
            }, _.prototype = {
                from: function() {
                    return U(this.anchor, this.head)
                },
                to: function() {
                    return V(this.anchor, this.head)
                },
                empty: function() {
                    return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch
                }
            };
            var _i, Xi, Yi, ji = {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                },
                $i = 0,
                qi = 0,
                Zi = 0,
                Qi = null;
            Si ? Qi = -.53 : yi ? Qi = 15 : Ti ? Qi = -.7 : Oi && (Qi = -1 / 3);
            var Ji, eo, to = null,
                ro = e.changeEnd = function(e) {
                    return e.text ? Ui(e.from.line + e.text.length - 1, Un(e.text).length + (1 == e.text.length ? e.from.ch : 0)) : e.to
                };
            e.prototype = {
                constructor: e,
                posFromMouse: function(e) {
                    return vt(this, e, !0)
                },
                focus: function() {
                    window.focus(), ft(this), st(this)
                },
                setOption: function(e, t) {
                    var r = this.options,
                        n = r[e];
                    r[e] == t && "mode" != e || (r[e] = t, io.hasOwnProperty(e) && $e(this, io[e])(this, t, n))
                },
                getOption: function(e) {
                    return this.options[e]
                },
                getDoc: function() {
                    return this.doc
                },
                addKeyMap: function(e, t) {
                    this.state.keyMaps[t ? "push" : "unshift"](e)
                },
                removeKeyMap: function(e) {
                    for (var t = this.state.keyMaps, r = 0; r < t.length; ++r)
                        if (t[r] == e || "string" != typeof t[r] && t[r].name == e) return t.splice(r, 1), !0
                },
                addOverlay: qe(function(t, r) {
                    var n = t.token ? t : e.getMode(this.options, t);
                    if (n.startState) throw new Error("Overlays may not be stateful.");
                    this.state.overlays.push({
                        mode: n,
                        modeSpec: t,
                        opaque: r && r.opaque
                    }), this.state.modeGen++, et(this)
                }),
                removeOverlay: qe(function(e) {
                    for (var t = this.state.overlays, r = 0; r < t.length; ++r) {
                        var n = t[r].modeSpec;
                        if (n == e || "string" == typeof e && n.name == e) return t.splice(r, 1), this.state.modeGen++, void et(this)
                    }
                }),
                indentLine: qe(function(e, t, r) {
                    "string" != typeof t && "number" != typeof t && (t = null == t ? this.options.smartIndent ? "smart" : "prev" : t ? "add" : "subtract"), Z(this.doc, e) && ir(this, e, t, r)
                }),
                indentSelection: qe(function(e) {
                    for (var t = this.doc.sel.ranges, r = -1, n = 0; n < t.length; n++) {
                        var i = t[n];
                        if (i.empty()) i.head.line > r && (ir(this, i.head.line, e, !0), r = i.head.line, n == this.doc.sel.primIndex && rr(this));
                        else {
                            var o = Math.max(r, i.from().line),
                                l = i.to();
                            r = Math.min(this.lastLine(), l.line - (l.ch ? 0 : 1)) + 1;
                            for (var a = o; a < r; ++a) ir(this, a, e)
                        }
                    }
                }),
                getTokenAt: function(e, t) {
                    var r = this.doc;
                    e = $(r, e);
                    for (var n = be(this, e.line, t), i = this.doc.mode, o = un(r, e.line), l = new bo(o.text, this.options.tabSize); l.pos < e.ch && !l.eol();) {
                        l.start = l.pos;
                        var a = i.token(l, n)
                    }
                    return {
                        start: l.start,
                        end: l.pos,
                        string: l.current(),
                        type: a || null,
                        state: n
                    }
                },
                getTokenTypeAt: function(e) {
                    e = $(this.doc, e);
                    var t = Xr(this, un(this.doc, e.line)),
                        r = 0,
                        n = (t.length - 1) / 2,
                        i = e.ch;
                    if (0 == i) return t[2];
                    for (;;) {
                        var o = r + n >> 1;
                        if ((o ? t[2 * o - 1] : 0) >= i) n = o;
                        else {
                            if (!(t[2 * o + 1] < i)) return t[2 * o + 2];
                            r = o + 1
                        }
                    }
                },
                getModeAt: function(t) {
                    var r = this.doc.mode;
                    return r.innerMode ? e.innerMode(r, this.getTokenAt(t).state).mode : r
                },
                getHelper: function(e, t) {
                    return this.getHelpers(e, t)[0]
                },
                getHelpers: function(e, t) {
                    var r = [];
                    if (!co.hasOwnProperty(t)) return co;
                    var n = co[t],
                        i = this.getModeAt(e);
                    if ("string" == typeof i[t]) n[i[t]] && r.push(n[i[t]]);
                    else if (i[t])
                        for (var o = 0; o < i[t].length; o++) {
                            var l = n[i[t][o]];
                            l && r.push(l)
                        } else i.helperType && n[i.helperType] ? r.push(n[i.helperType]) : n[i.name] && r.push(n[i.name]);
                    for (var o = 0; o < n._global.length; o++) {
                        var a = n._global[o];
                        a.pred(i, this) && Kn(r, a.val) == -1 && r.push(a.val)
                    }
                    return r
                },
                getStateAfter: function(e, t) {
                    var r = this.doc;
                    return e = j(r, null == e ? r.first + r.size - 1 : e), be(this, e + 1, t)
                },
                cursorCoords: function(e, t) {
                    var r, n = this.doc.sel.primary();
                    return r = null == e ? n.head : "object" == typeof e ? $(this.doc, e) : e ? n.from() : n.to(), Fe(this, r, t || "page")
                },
                charCoords: function(e, t) {
                    return Pe(this, $(this.doc, e), t || "page")
                },
                coordsChar: function(e, t) {
                    return e = Re(this, e, t || "page"), Ve(this, e.left, e.top)
                },
                lineAtHeight: function(e, t) {
                    return e = Re(this, {
                        top: e,
                        left: 0
                    }, t || "page").top, pn(this.doc, e + this.display.viewOffset)
                },
                heightAtLine: function(e, t) {
                    var r = !1,
                        n = this.doc.first + this.doc.size - 1;
                    e < this.doc.first ? e = this.doc.first : e > n && (e = n, r = !0);
                    var i = un(this.doc, e);
                    return ze(this, i, {
                        top: 0,
                        left: 0
                    }, t || "page").top + (r ? this.doc.height - gn(i) : 0)
                },
                defaultTextHeight: function() {
                    return Ke(this.display)
                },
                defaultCharWidth: function() {
                    return _e(this.display)
                },
                setGutterMarker: qe(function(e, t, r) {
                    return or(this, e, "gutter", function(e) {
                        var n = e.gutterMarkers || (e.gutterMarkers = {});
                        return n[t] = r, !r && $n(n) && (e.gutterMarkers = null), !0
                    })
                }),
                clearGutter: qe(function(e) {
                    var t = this,
                        r = t.doc,
                        n = r.first;
                    r.iter(function(r) {
                        r.gutterMarkers && r.gutterMarkers[e] && (r.gutterMarkers[e] = null, tt(t, n, "gutter"), $n(r.gutterMarkers) && (r.gutterMarkers = null)), ++n
                    })
                }),
                addLineClass: qe(function(e, t, r) {
                    return or(this, e, "class", function(e) {
                        var n = "text" == t ? "textClass" : "background" == t ? "bgClass" : "wrapClass";
                        if (e[n]) {
                            if (new RegExp("(?:^|\\s)" + r + "(?:$|\\s)").test(e[n])) return !1;
                            e[n] += " " + r
                        } else e[n] = r;
                        return !0
                    })
                }),
                removeLineClass: qe(function(e, t, r) {
                    return or(this, e, "class", function(e) {
                        var n = "text" == t ? "textClass" : "background" == t ? "bgClass" : "wrapClass",
                            i = e[n];
                        if (!i) return !1;
                        if (null == r) e[n] = null;
                        else {
                            var o = i.match(new RegExp("(?:^|\\s+)" + r + "(?:$|\\s+)"));
                            if (!o) return !1;
                            var l = o.index + o[0].length;
                            e[n] = i.slice(0, o.index) + (o.index && l != i.length ? " " : "") + i.slice(l) || null
                        }
                        return !0
                    })
                }),
                addLineWidget: qe(function(e, t, r) {
                    return Gr(this, e, t, r)
                }),
                removeLineWidget: function(e) {
                    e.clear()
                },
                lineInfo: function(e) {
                    if ("number" == typeof e) {
                        if (!Z(this.doc, e)) return null;
                        var t = e;
                        if (e = un(this.doc, e), !e) return null
                    } else {
                        var t = dn(e);
                        if (null == t) return null
                    }
                    return {
                        line: t,
                        handle: e,
                        text: e.text,
                        gutterMarkers: e.gutterMarkers,
                        textClass: e.textClass,
                        bgClass: e.bgClass,
                        wrapClass: e.wrapClass,
                        widgets: e.widgets
                    }
                },
                getViewport: function() {
                    return {
                        from: this.display.viewFrom,
                        to: this.display.viewTo
                    }
                },
                addWidget: function(e, t, r, n, i) {
                    var o = this.display;
                    e = Fe(this, $(this.doc, e));
                    var l = e.bottom,
                        a = e.left;
                    if (t.style.position = "absolute", o.sizer.appendChild(t), "over" == n) l = e.top;
                    else if ("above" == n || "near" == n) {
                        var s = Math.max(o.wrapper.clientHeight, this.doc.height),
                            u = Math.max(o.sizer.clientWidth, o.lineSpace.clientWidth);
                        ("above" == n || e.bottom + t.offsetHeight > s) && e.top > t.offsetHeight ? l = e.top - t.offsetHeight : e.bottom + t.offsetHeight <= s && (l = e.bottom), a + t.offsetWidth > u && (a = u - t.offsetWidth)
                    }
                    t.style.top = l + "px", t.style.left = t.style.right = "", "right" == i ? (a = o.sizer.clientWidth - t.offsetWidth, t.style.right = "0px") : ("left" == i ? a = 0 : "middle" == i && (a = (o.sizer.clientWidth - t.offsetWidth) / 2), t.style.left = a + "px"), r && Jt(this, a, l, a + t.offsetWidth, l + t.offsetHeight)
                },
                triggerOnKeyDown: qe(Wt),
                triggerOnKeyPress: qe(It),
                triggerOnKeyUp: qe(Dt),
                execCommand: function(e) {
                    if (po.hasOwnProperty(e)) return po[e](this)
                },
                findPosH: function(e, t, r, n) {
                    var i = 1;
                    t < 0 && (i = -1, t = -t);
                    for (var o = 0, l = $(this.doc, e); o < t && (l = ar(this.doc, l, i, r, n), !l.hitSide); ++o);
                    return l
                },
                moveH: qe(function(e, t) {
                    var r = this;
                    r.extendSelectionsBy(function(n) {
                        return r.display.shift || r.doc.extend || n.empty() ? ar(r.doc, n.head, e, t, r.options.rtlMoveVisually) : e < 0 ? n.from() : n.to()
                    }, Uo)
                }),
                deleteH: qe(function(e, t) {
                    var r = this.doc.sel,
                        n = this.doc;
                    r.somethingSelected() ? n.replaceSelection("", null, "+delete") : lr(this, function(r) {
                        var i = ar(n, r.head, e, t, !1);
                        return e < 0 ? {
                            from: i,
                            to: r.head
                        } : {
                            from: r.head,
                            to: i
                        }
                    })
                }),
                findPosV: function(e, t, r, n) {
                    var i = 1,
                        o = n;
                    t < 0 && (i = -1, t = -t);
                    for (var l = 0, a = $(this.doc, e); l < t; ++l) {
                        var s = Fe(this, a, "div");
                        if (null == o ? o = s.left : s.left = o, a = sr(this, s, i, r), a.hitSide) break
                    }
                    return a
                },
                moveV: qe(function(e, t) {
                    var r = this,
                        n = this.doc,
                        i = [],
                        o = !r.display.shift && !n.extend && n.sel.somethingSelected();
                    if (n.extendSelectionsBy(function(l) {
                            if (o) return e < 0 ? l.from() : l.to();
                            var a = Fe(r, l.head, "div");
                            null != l.goalColumn && (a.left = l.goalColumn), i.push(a.left);
                            var s = sr(r, a, e, t);
                            return "page" == t && l == n.sel.primary() && tr(r, null, Pe(r, s, "div").top - a.top), s
                        }, Uo), i.length)
                        for (var l = 0; l < n.sel.ranges.length; l++) n.sel.ranges[l].goalColumn = i[l]
                }),
                toggleOverwrite: function(e) {
                    null != e && e == this.state.overwrite || ((this.state.overwrite = !this.state.overwrite) ? this.display.cursorDiv.className += " CodeMirror-overwrite" : this.display.cursorDiv.className = this.display.cursorDiv.className.replace(" CodeMirror-overwrite", ""), Ro(this, "overwriteToggle", this, this.state.overwrite))
                },
                hasFocus: function() {
                    return ri() == this.display.input
                },
                scrollTo: qe(function(e, t) {
                    null == e && null == t || nr(this), null != e && (this.curOp.scrollLeft = e), null != t && (this.curOp.scrollTop = t)
                }),
                getScrollInfo: function() {
                    var e = this.display.scroller,
                        t = Fo;
                    return {
                        left: e.scrollLeft,
                        top: e.scrollTop,
                        height: e.scrollHeight - t,
                        width: e.scrollWidth - t,
                        clientHeight: e.clientHeight - t,
                        clientWidth: e.clientWidth - t
                    }
                },
                scrollIntoView: qe(function(e, t) {
                    if (null == e ? (e = {
                            from: this.doc.sel.primary().head,
                            to: null
                        }, null == t && (t = this.options.cursorScrollMargin)) : "number" == typeof e ? e = {
                            from: Ui(e, 0),
                            to: null
                        } : null == e.from && (e = {
                            from: e,
                            to: null
                        }), e.to || (e.to = e.from), e.margin = t || 0, null != e.from.line) nr(this), this.curOp.scrollToPos = e;
                    else {
                        var r = er(this, Math.min(e.from.left, e.to.left), Math.min(e.from.top, e.to.top) - e.margin, Math.max(e.from.right, e.to.right), Math.max(e.from.bottom, e.to.bottom) + e.margin);
                        this.scrollTo(r.scrollLeft, r.scrollTop)
                    }
                }),
                setSize: qe(function(e, t) {
                    function r(e) {
                        return "number" == typeof e || /^\d+$/.test(String(e)) ? e + "px" : e
                    }
                    null != e && (this.display.wrapper.style.width = r(e)), null != t && (this.display.wrapper.style.height = r(t)), this.options.lineWrapping && We(this), this.curOp.forceUpdate = !0, Ro(this, "refresh", this)
                }),
                operation: function(e) {
                    return je(this, e)
                },
                refresh: qe(function() {
                    var e = this.display.cachedTextHeight;
                    et(this), De(this), this.scrollTo(this.doc.scrollLeft, this.doc.scrollTop), (null == e || Math.abs(e - Ke(this.display)) > .5) && l(this), Ro(this, "refresh", this)
                }),
                swapDoc: qe(function(e) {
                    var t = this.doc;
                    return t.cm = null, sn(this, e), De(this), ct(this), this.scrollTo(e.scrollLeft, e.scrollTop), En(this, "swapDoc", this, t), t
                }),
                getInputField: function() {
                    return this.display.input
                },
                getWrapperElement: function() {
                    return this.display.wrapper
                },
                getScrollerElement: function() {
                    return this.display.scroller
                },
                getGutterElement: function() {
                    return this.display.gutters
                }
            }, Fn(e);
            var no = e.defaults = {},
                io = e.optionHandlers = {},
                oo = e.Init = {
                    toString: function() {
                        return "CodeMirror.Init"
                    }
                };
            cr("value", "", function(e, t) {
                e.setValue(t)
            }, !0), cr("mode", null, function(e, t) {
                e.doc.modeOption = t, r(e)
            }, !0), cr("indentUnit", 2, r, !0), cr("indentWithTabs", !1), cr("smartIndent", !0), cr("tabSize", 4, function(e) {
                n(e), De(e), et(e)
            }, !0), cr("specialChars", /[\t\u0000-\u0019\u00ad\u200b\u2028\u2029\ufeff]/g, function(e, t) {
                e.options.specialChars = new RegExp(t.source + (t.test("\t") ? "" : "|\t"), "g"), e.refresh()
            }, !0), cr("specialCharPlaceholder", qr, function(e) {
                e.refresh()
            }, !0), cr("electricChars", !0), cr("rtlMoveVisually", !Ri), cr("wholeLineUpdateBefore", !0), cr("theme", "default", function(e) {
                s(e), u(e)
            }, !0), cr("keyMap", "default", a), cr("extraKeys", null), cr("lineWrapping", !1, i, !0), cr("gutters", [], function(e) {
                d(e.options), u(e)
            }, !0), cr("fixedGutter", !0, function(e, t) {
                e.display.gutters.style.left = t ? x(e.display) + "px" : "0", e.refresh()
            }, !0), cr("coverGutterNextToScrollbar", !1, g, !0), cr("lineNumbers", !1, function(e) {
                d(e.options), u(e)
            }, !0), cr("firstLineNumber", 1, u, !0), cr("lineNumberFormatter", function(e) {
                return e
            }, u, !0), cr("showCursorWhenSelecting", !1, he, !0), cr("resetSelectionOnContextMenu", !0), cr("readOnly", !1, function(e, t) {
                "nocursor" == t ? (zt(e), e.display.input.blur(), e.display.disabled = !0) : (e.display.disabled = !1, t || ct(e))
            }), cr("disableInput", !1, function(e, t) {
                t || ct(e)
            }, !0), cr("dragDrop", !0), cr("cursorBlinkRate", 530), cr("cursorScrollMargin", 0), cr("cursorHeight", 1), cr("workTime", 100), cr("workDelay", 100), cr("flattenSpans", !0, n, !0), cr("addModeClass", !1, n, !0), cr("pollInterval", 100), cr("undoDepth", 200, function(e, t) {
                e.doc.history.undoDepth = t
            }), cr("historyEventDelay", 1250), cr("viewportMargin", 10, function(e) {
                e.refresh()
            }, !0), cr("maxHighlightLength", 1e4, n, !0), cr("moveInputWithCursor", !0, function(e, t) {
                t || (e.display.inputDiv.style.top = e.display.inputDiv.style.left = 0)
            }), cr("tabindex", null, function(e, t) {
                e.display.input.tabIndex = t || ""
            }), cr("autofocus", null);
            var lo = e.modes = {},
                ao = e.mimeModes = {};
            e.defineMode = function(t, r) {
                if (e.defaults.mode || "null" == t || (e.defaults.mode = t), arguments.length > 2) {
                    r.dependencies = [];
                    for (var n = 2; n < arguments.length; ++n) r.dependencies.push(arguments[n])
                }
                lo[t] = r
            }, e.defineMIME = function(e, t) {
                ao[e] = t
            }, e.resolveMode = function(t) {
                if ("string" == typeof t && ao.hasOwnProperty(t)) t = ao[t];
                else if (t && "string" == typeof t.name && ao.hasOwnProperty(t.name)) {
                    var r = ao[t.name];
                    "string" == typeof r && (r = {
                        name: r
                    }), t = Xn(r, t), t.name = r.name
                } else if ("string" == typeof t && /^[\w\-]+\/[\w\-]+\+xml$/.test(t)) return e.resolveMode("application/xml");
                return "string" == typeof t ? {
                    name: t
                } : t || {
                    name: "null"
                }
            }, e.getMode = function(t, r) {
                var r = e.resolveMode(r),
                    n = lo[r.name];
                if (!n) return e.getMode(t, "text/plain");
                var i = n(t, r);
                if (so.hasOwnProperty(r.name)) {
                    var o = so[r.name];
                    for (var l in o) o.hasOwnProperty(l) && (i.hasOwnProperty(l) && (i["_" + l] = i[l]), i[l] = o[l])
                }
                if (i.name = r.name, r.helperType && (i.helperType = r.helperType), r.modeProps)
                    for (var l in r.modeProps) i[l] = r.modeProps[l];
                return i
            }, e.defineMode("null", function() {
                return {
                    token: function(e) {
                        e.skipToEnd()
                    }
                }
            }), e.defineMIME("text/plain", "null");
            var so = e.modeExtensions = {};
            e.extendMode = function(e, t) {
                var r = so.hasOwnProperty(e) ? so[e] : so[e] = {};
                Yn(t, r)
            }, e.defineExtension = function(t, r) {
                e.prototype[t] = r
            }, e.defineDocExtension = function(e, t) {
                No.prototype[e] = t
            }, e.defineOption = cr;
            var uo = [];
            e.defineInitHook = function(e) {
                uo.push(e)
            };
            var co = e.helpers = {};
            e.registerHelper = function(t, r, n) {
                co.hasOwnProperty(t) || (co[t] = e[t] = {
                    _global: []
                }), co[t][r] = n
            }, e.registerGlobalHelper = function(t, r, n, i) {
                e.registerHelper(t, r, i), co[t]._global.push({
                    pred: n,
                    val: i
                })
            };
            var fo = e.copyState = function(e, t) {
                    if (t === !0) return t;
                    if (e.copyState) return e.copyState(t);
                    var r = {};
                    for (var n in t) {
                        var i = t[n];
                        i instanceof Array && (i = i.concat([])), r[n] = i
                    }
                    return r
                },
                ho = e.startState = function(e, t, r) {
                    return !e.startState || e.startState(t, r)
                };
            e.innerMode = function(e, t) {
                for (; e.innerMode;) {
                    var r = e.innerMode(t);
                    if (!r || r.mode == e) break;
                    t = r.state, e = r.mode
                }
                return r || {
                    mode: e,
                    state: t
                }
            };
            var po = e.commands = {
                    selectAll: function(e) {
                        e.setSelection(Ui(e.firstLine(), 0), Ui(e.lastLine()), Go)
                    },
                    singleSelection: function(e) {
                        e.setSelection(e.getCursor("anchor"), e.getCursor("head"), Go)
                    },
                    killLine: function(e) {
                        lr(e, function(t) {
                            if (t.empty()) {
                                var r = un(e.doc, t.head.line).text.length;
                                return t.head.ch == r && t.head.line < e.lastLine() ? {
                                    from: t.head,
                                    to: Ui(t.head.line + 1, 0)
                                } : {
                                    from: t.head,
                                    to: Ui(t.head.line, r)
                                }
                            }
                            return {
                                from: t.from(),
                                to: t.to()
                            }
                        })
                    },
                    deleteLine: function(e) {
                        lr(e, function(t) {
                            return {
                                from: Ui(t.from().line, 0),
                                to: $(e.doc, Ui(t.to().line + 1, 0))
                            }
                        })
                    },
                    delLineLeft: function(e) {
                        lr(e, function(e) {
                            return {
                                from: Ui(e.from().line, 0),
                                to: e.from()
                            }
                        })
                    },
                    undo: function(e) {
                        e.undo()
                    },
                    redo: function(e) {
                        e.redo()
                    },
                    undoSelection: function(e) {
                        e.undoSelection()
                    },
                    redoSelection: function(e) {
                        e.redoSelection()
                    },
                    goDocStart: function(e) {
                        e.extendSelection(Ui(e.firstLine(), 0))
                    },
                    goDocEnd: function(e) {
                        e.extendSelection(Ui(e.lastLine()))
                    },
                    goLineStart: function(e) {
                        e.extendSelectionsBy(function(t) {
                            return fi(e, t.head.line)
                        }, Uo)
                    },
                    goLineStartSmart: function(e) {
                        e.extendSelectionsBy(function(t) {
                            var r = fi(e, t.head.line),
                                n = e.getLineHandle(r.line),
                                i = vn(n);
                            if (!i || 0 == i[0].level) {
                                var o = Math.max(0, n.text.search(/\S/)),
                                    l = t.head.line == r.line && t.head.ch <= o && t.head.ch;
                                return Ui(r.line, l ? 0 : o)
                            }
                            return r
                        }, Uo)
                    },
                    goLineEnd: function(e) {
                        e.extendSelectionsBy(function(t) {
                            return hi(e, t.head.line)
                        }, Uo)
                    },
                    goLineRight: function(e) {
                        e.extendSelectionsBy(function(t) {
                            var r = e.charCoords(t.head, "div").top + 5;
                            return e.coordsChar({
                                left: e.display.lineDiv.offsetWidth + 100,
                                top: r
                            }, "div")
                        }, Uo)
                    },
                    goLineLeft: function(e) {
                        e.extendSelectionsBy(function(t) {
                            var r = e.charCoords(t.head, "div").top + 5;
                            return e.coordsChar({
                                left: 0,
                                top: r
                            }, "div")
                        }, Uo)
                    },
                    goLineUp: function(e) {
                        e.moveV(-1, "line")
                    },
                    goLineDown: function(e) {
                        e.moveV(1, "line")
                    },
                    goPageUp: function(e) {
                        e.moveV(-1, "page")
                    },
                    goPageDown: function(e) {
                        e.moveV(1, "page")
                    },
                    goCharLeft: function(e) {
                        e.moveH(-1, "char")
                    },
                    goCharRight: function(e) {
                        e.moveH(1, "char")
                    },
                    goColumnLeft: function(e) {
                        e.moveH(-1, "column")
                    },
                    goColumnRight: function(e) {
                        e.moveH(1, "column")
                    },
                    goWordLeft: function(e) {
                        e.moveH(-1, "word")
                    },
                    goGroupRight: function(e) {
                        e.moveH(1, "group")
                    },
                    goGroupLeft: function(e) {
                        e.moveH(-1, "group")
                    },
                    goWordRight: function(e) {
                        e.moveH(1, "word")
                    },
                    delCharBefore: function(e) {
                        e.deleteH(-1, "char")
                    },
                    delCharAfter: function(e) {
                        e.deleteH(1, "char")
                    },
                    delWordBefore: function(e) {
                        e.deleteH(-1, "word")
                    },
                    delWordAfter: function(e) {
                        e.deleteH(1, "word")
                    },
                    delGroupBefore: function(e) {
                        e.deleteH(-1, "group")
                    },
                    delGroupAfter: function(e) {
                        e.deleteH(1, "group")
                    },
                    indentAuto: function(e) {
                        e.indentSelection("smart")
                    },
                    indentMore: function(e) {
                        e.indentSelection("add")
                    },
                    indentLess: function(e) {
                        e.indentSelection("subtract")
                    },
                    insertTab: function(e) {
                        e.replaceSelection("\t")
                    },
                    defaultTab: function(e) {
                        e.somethingSelected() ? e.indentSelection("add") : e.execCommand("insertTab")
                    },
                    transposeChars: function(e) {
                        je(e, function() {
                            for (var t = e.listSelections(), r = 0; r < t.length; r++) {
                                var n = t[r].head,
                                    i = un(e.doc, n.line).text;
                                n.ch > 0 && n.ch < i.length - 1 && e.replaceRange(i.charAt(n.ch) + i.charAt(n.ch - 1), Ui(n.line, n.ch - 1), Ui(n.line, n.ch + 1))
                            }
                        })
                    },
                    newlineAndIndent: function(e) {
                        je(e, function() {
                            for (var t = e.listSelections().length, r = 0; r < t; r++) {
                                var n = e.listSelections()[r];
                                e.replaceRange("\n", n.anchor, n.head, "+input"), e.indentLine(n.from().line + 1, null, !0), rr(e)
                            }
                        })
                    },
                    toggleOverwrite: function(e) {
                        e.toggleOverwrite()
                    }
                },
                go = e.keyMap = {};
            go.basic = {
                Left: "goCharLeft",
                Right: "goCharRight",
                Up: "goLineUp",
                Down: "goLineDown",
                End: "goLineEnd",
                Home: "goLineStartSmart",
                PageUp: "goPageUp",
                PageDown: "goPageDown",
                Delete: "delCharAfter",
                Backspace: "delCharBefore",
                "Shift-Backspace": "delCharBefore",
                Tab: "defaultTab",
                "Shift-Tab": "indentAuto",
                Enter: "newlineAndIndent",
                Insert: "toggleOverwrite",
                Esc: "singleSelection"
            }, go.pcDefault = {
                "Ctrl-A": "selectAll",
                "Ctrl-D": "deleteLine",
                "Ctrl-Z": "undo",
                "Shift-Ctrl-Z": "redo",
                "Ctrl-Y": "redo",
                "Ctrl-Home": "goDocStart",
                "Ctrl-Up": "goDocStart",
                "Ctrl-End": "goDocEnd",
                "Ctrl-Down": "goDocEnd",
                "Ctrl-Left": "goGroupLeft",
                "Ctrl-Right": "goGroupRight",
                "Alt-Left": "goLineStart",
                "Alt-Right": "goLineEnd",
                "Ctrl-Backspace": "delGroupBefore",
                "Ctrl-Delete": "delGroupAfter",
                "Ctrl-S": "save",
                "Ctrl-F": "find",
                "Ctrl-G": "findNext",
                "Shift-Ctrl-G": "findPrev",
                "Shift-Ctrl-F": "replace",
                "Shift-Ctrl-R": "replaceAll",
                "Ctrl-[": "indentLess",
                "Ctrl-]": "indentMore",
                "Ctrl-U": "undoSelection",
                "Shift-Ctrl-U": "redoSelection",
                "Alt-U": "redoSelection",
                fallthrough: "basic"
            }, go.macDefault = {
                "Cmd-A": "selectAll",
                "Cmd-D": "deleteLine",
                "Cmd-Z": "undo",
                "Shift-Cmd-Z": "redo",
                "Cmd-Y": "redo",
                "Cmd-Up": "goDocStart",
                "Cmd-End": "goDocEnd",
                "Cmd-Down": "goDocEnd",
                "Alt-Left": "goGroupLeft",
                "Alt-Right": "goGroupRight",
                "Cmd-Left": "goLineStart",
                "Cmd-Right": "goLineEnd",
                "Alt-Backspace": "delGroupBefore",
                "Ctrl-Alt-Backspace": "delGroupAfter",
                "Alt-Delete": "delGroupAfter",
                "Cmd-S": "save",
                "Cmd-F": "find",
                "Cmd-G": "findNext",
                "Shift-Cmd-G": "findPrev",
                "Cmd-Alt-F": "replace",
                "Shift-Cmd-Alt-F": "replaceAll",
                "Cmd-[": "indentLess",
                "Cmd-]": "indentMore",
                "Cmd-Backspace": "delLineLeft",
                "Cmd-U": "undoSelection",
                "Shift-Cmd-U": "redoSelection",
                fallthrough: ["basic", "emacsy"]
            }, go.emacsy = {
                "Ctrl-F": "goCharRight",
                "Ctrl-B": "goCharLeft",
                "Ctrl-P": "goLineUp",
                "Ctrl-N": "goLineDown",
                "Alt-F": "goWordRight",
                "Alt-B": "goWordLeft",
                "Ctrl-A": "goLineStart",
                "Ctrl-E": "goLineEnd",
                "Ctrl-V": "goPageDown",
                "Shift-Ctrl-V": "goPageUp",
                "Ctrl-D": "delCharAfter",
                "Ctrl-H": "delCharBefore",
                "Alt-D": "delWordAfter",
                "Alt-Backspace": "delWordBefore",
                "Ctrl-K": "killLine",
                "Ctrl-T": "transposeChars"
            }, go.default = zi ? go.macDefault : go.pcDefault;
            var vo = e.lookupKey = function(e, t, r) {
                    function n(t) {
                        t = fr(t);
                        var i = t[e];
                        if (i === !1) return "stop";
                        if (null != i && r(i)) return !0;
                        if (t.nofallthrough) return "stop";
                        var o = t.fallthrough;
                        if (null == o) return !1;
                        if ("[object Array]" != Object.prototype.toString.call(o)) return n(o);
                        for (var l = 0; l < o.length; ++l) {
                            var a = n(o[l]);
                            if (a) return a
                        }
                        return !1
                    }
                    for (var i = 0; i < t.length; ++i) {
                        var o = n(t[i]);
                        if (o) return "stop" != o
                    }
                },
                mo = e.isModifierKey = function(e) {
                    var t = ol[e.keyCode];
                    return "Ctrl" == t || "Alt" == t || "Shift" == t || "Mod" == t
                },
                yo = e.keyName = function(e, t) {
                    if (Ni && 34 == e.keyCode && e.char) return !1;
                    var r = ol[e.keyCode];
                    return null != r && !e.altGraphKey && (e.altKey && (r = "Alt-" + r), (Fi ? e.metaKey : e.ctrlKey) && (r = "Ctrl-" + r), (Fi ? e.ctrlKey : e.metaKey) && (r = "Cmd-" + r), !t && e.shiftKey && (r = "Shift-" + r), r)
                };
            e.fromTextArea = function(t, r) {
                function n() {
                    t.value = s.getValue()
                }
                if (r || (r = {}), r.value = t.value, !r.tabindex && t.tabindex && (r.tabindex = t.tabindex), !r.placeholder && t.placeholder && (r.placeholder = t.placeholder), null == r.autofocus) {
                    var i = ri();
                    r.autofocus = i == t || null != t.getAttribute("autofocus") && i == document.body
                }
                if (t.form && (Eo(t.form, "submit", n), !r.leaveSubmitMethodAlone)) {
                    var o = t.form,
                        l = o.submit;
                    try {
                        var a = o.submit = function() {
                            n(), o.submit = l, o.submit(), o.submit = a
                        }
                    } catch (e) {}
                }
                t.style.display = "none";
                var s = e(function(e) {
                    t.parentNode.insertBefore(e, t.nextSibling)
                }, r);
                return s.save = n, s.getTextArea = function() {
                    return t
                }, s.toTextArea = function() {
                    n(), t.parentNode.removeChild(s.getWrapperElement()), t.style.display = "", t.form && (zo(t.form, "submit", n), "function" == typeof t.form.submit && (t.form.submit = l))
                }, s
            };
            var bo = e.StringStream = function(e, t) {
                this.pos = this.start = 0, this.string = e, this.tabSize = t || 8, this.lastColumnPos = this.lastColumnValue = 0, this.lineStart = 0
            };
            bo.prototype = {
                eol: function() {
                    return this.pos >= this.string.length
                },
                sol: function() {
                    return this.pos == this.lineStart
                },
                peek: function() {
                    return this.string.charAt(this.pos) || void 0
                },
                next: function() {
                    if (this.pos < this.string.length) return this.string.charAt(this.pos++)
                },
                eat: function(e) {
                    var t = this.string.charAt(this.pos);
                    if ("string" == typeof e) var r = t == e;
                    else var r = t && (e.test ? e.test(t) : e(t));
                    if (r) return ++this.pos, t
                },
                eatWhile: function(e) {
                    for (var t = this.pos; this.eat(e););
                    return this.pos > t
                },
                eatSpace: function() {
                    for (var e = this.pos;
                        /[\s\u00a0]/.test(this.string.charAt(this.pos));) ++this.pos;
                    return this.pos > e
                },
                skipToEnd: function() {
                    this.pos = this.string.length
                },
                skipTo: function(e) {
                    var t = this.string.indexOf(e, this.pos);
                    if (t > -1) return this.pos = t, !0
                },
                backUp: function(e) {
                    this.pos -= e
                },
                column: function() {
                    return this.lastColumnPos < this.start && (this.lastColumnValue = Ko(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue), this.lastColumnPos = this.start), this.lastColumnValue - (this.lineStart ? Ko(this.string, this.lineStart, this.tabSize) : 0)
                },
                indentation: function() {
                    return Ko(this.string, null, this.tabSize) - (this.lineStart ? Ko(this.string, this.lineStart, this.tabSize) : 0)
                },
                match: function(e, t, r) {
                    if ("string" != typeof e) {
                        var n = this.string.slice(this.pos).match(e);
                        return n && n.index > 0 ? null : (n && t !== !1 && (this.pos += n[0].length), n)
                    }
                    var i = function(e) {
                            return r ? e.toLowerCase() : e
                        },
                        o = this.string.substr(this.pos, e.length);
                    if (i(o) == i(e)) return t !== !1 && (this.pos += e.length), !0
                },
                current: function() {
                    return this.string.slice(this.start, this.pos)
                },
                hideFirstChars: function(e, t) {
                    this.lineStart += e;
                    try {
                        return t()
                    } finally {
                        this.lineStart -= e
                    }
                }
            };
            var xo = e.TextMarker = function(e, t) {
                this.lines = [], this.type = t, this.doc = e
            };
            Fn(xo), xo.prototype.clear = function() {
                if (!this.explicitlyCleared) {
                    var e = this.doc.cm,
                        t = e && !e.curOp;
                    if (t && Xe(e), Pn(this, "clear")) {
                        var r = this.find();
                        r && En(this, "clear", r.from, r.to)
                    }
                    for (var n = null, i = null, o = 0; o < this.lines.length; ++o) {
                        var l = this.lines[o],
                            a = gr(l.markedSpans, this);
                        e && !this.collapsed ? tt(e, dn(l), "text") : e && (null != a.to && (i = dn(l)), null != a.from && (n = dn(l))), l.markedSpans = vr(l.markedSpans, a), null == a.from && this.collapsed && !Rr(this.doc, l) && e && hn(l, Ke(e.display))
                    }
                    if (e && this.collapsed && !e.options.lineWrapping)
                        for (var o = 0; o < this.lines.length; ++o) {
                            var s = Dr(this.lines[o]),
                                u = f(s);
                            u > e.display.maxLineLength && (e.display.maxLine = s, e.display.maxLineLength = u, e.display.maxLineChanged = !0)
                        }
                    null != n && e && this.collapsed && et(e, n, i + 1), this.lines.length = 0, this.explicitlyCleared = !0, this.atomic && this.doc.cantEdit && (this.doc.cantEdit = !1, e && ue(e.doc)), e && En(e, "markerCleared", e, this), t && Ye(e)
                }
            }, xo.prototype.find = function(e, t) {
                null == e && "bookmark" == this.type && (e = 1);
                for (var r, n, i = 0; i < this.lines.length; ++i) {
                    var o = this.lines[i],
                        l = gr(o.markedSpans, this);
                    if (null != l.from && (r = Ui(t ? o : dn(o), l.from), e == -1)) return r;
                    if (null != l.to && (n = Ui(t ? o : dn(o), l.to), 1 == e)) return n
                }
                return r && {
                    from: r,
                    to: n
                }
            }, xo.prototype.changed = function() {
                var e = this.find(-1, !0),
                    t = this,
                    r = this.doc.cm;
                e && r && je(r, function() {
                    var n = e.line,
                        i = dn(e.line),
                        o = Te(r, i);
                    if (o && (Ae(o), r.curOp.selectionChanged = r.curOp.forceUpdate = !0), r.curOp.updateMaxLine = !0, !Rr(t.doc, n) && null != t.height) {
                        var l = t.height;
                        t.height = null;
                        var a = Br(t) - l;
                        a && hn(n, n.height + a)
                    }
                })
            }, xo.prototype.attachLine = function(e) {
                if (!this.lines.length && this.doc.cm) {
                    var t = this.doc.cm.curOp;
                    t.maybeHiddenMarkers && Kn(t.maybeHiddenMarkers, this) != -1 || (t.maybeUnhiddenMarkers || (t.maybeUnhiddenMarkers = [])).push(this)
                }
                this.lines.push(e)
            }, xo.prototype.detachLine = function(e) {
                if (this.lines.splice(Kn(this.lines, e), 1), !this.lines.length && this.doc.cm) {
                    var t = this.doc.cm.curOp;
                    (t.maybeHiddenMarkers || (t.maybeHiddenMarkers = [])).push(this)
                }
            };
            var wo = 0,
                Co = e.SharedTextMarker = function(e, t) {
                    this.markers = e, this.primary = t;
                    for (var r = 0, n = this; r < e.length; ++r) e[r].parent = this, Eo(e[r], "clear", function() {
                        n.clear()
                    })
                };
            Fn(Co), Co.prototype.clear = function() {
                if (!this.explicitlyCleared) {
                    this.explicitlyCleared = !0;
                    for (var e = 0; e < this.markers.length; ++e) this.markers[e].clear();
                    En(this, "clear")
                }
            }, Co.prototype.find = function(e, t) {
                return this.primary.find(e, t)
            };
            var Lo = e.LineWidget = function(e, t, r) {
                if (r)
                    for (var n in r) r.hasOwnProperty(n) && (this[n] = r[n]);
                this.cm = e, this.node = t
            };
            Fn(Lo), Lo.prototype.clear = function() {
                var e = this.cm,
                    t = this.line.widgets,
                    r = this.line,
                    n = dn(r);
                if (null != n && t) {
                    for (var i = 0; i < t.length; ++i) t[i] == this && t.splice(i--, 1);
                    t.length || (r.widgets = null);
                    var o = Br(this);
                    je(e, function() {
                        Fr(e, r, -o), tt(e, n, "widget"), hn(r, Math.max(0, r.height - o))
                    })
                }
            }, Lo.prototype.changed = function() {
                var e = this.height,
                    t = this.cm,
                    r = this.line;
                this.height = null;
                var n = Br(this) - e;
                n && je(t, function() {
                    t.curOp.forceUpdate = !0, Fr(t, r, n), hn(r, r.height + n)
                })
            };
            var So = e.Line = function(e, t, r) {
                this.text = e, kr(this, t), this.height = r ? r(this) : 1
            };
            Fn(So), So.prototype.lineNo = function() {
                return dn(this)
            };
            var ko = {},
                Mo = {};
            on.prototype = {
                chunkSize: function() {
                    return this.lines.length
                },
                removeInner: function(e, t) {
                    for (var r = e, n = e + t; r < n; ++r) {
                        var i = this.lines[r];
                        this.height -= i.height, Ur(i), En(i, "delete")
                    }
                    this.lines.splice(e, t)
                },
                collapse: function(e) {
                    e.push.apply(e, this.lines)
                },
                insertInner: function(e, t, r) {
                    this.height += r, this.lines = this.lines.slice(0, e).concat(t).concat(this.lines.slice(e));
                    for (var n = 0; n < t.length; ++n) t[n].parent = this
                },
                iterN: function(e, t, r) {
                    for (var n = e + t; e < n; ++e)
                        if (r(this.lines[e])) return !0
                }
            }, ln.prototype = {
                chunkSize: function() {
                    return this.size
                },
                removeInner: function(e, t) {
                    this.size -= t;
                    for (var r = 0; r < this.children.length; ++r) {
                        var n = this.children[r],
                            i = n.chunkSize();
                        if (e < i) {
                            var o = Math.min(t, i - e),
                                l = n.height;
                            if (n.removeInner(e, o), this.height -= l - n.height, i == o && (this.children.splice(r--, 1), n.parent = null), 0 == (t -= o)) break;
                            e = 0
                        } else e -= i
                    }
                    if (this.size - t < 25 && (this.children.length > 1 || !(this.children[0] instanceof on))) {
                        var a = [];
                        this.collapse(a), this.children = [new on(a)], this.children[0].parent = this
                    }
                },
                collapse: function(e) {
                    for (var t = 0; t < this.children.length; ++t) this.children[t].collapse(e)
                },
                insertInner: function(e, t, r) {
                    this.size += t.length, this.height += r;
                    for (var n = 0; n < this.children.length; ++n) {
                        var i = this.children[n],
                            o = i.chunkSize();
                        if (e <= o) {
                            if (i.insertInner(e, t, r), i.lines && i.lines.length > 50) {
                                for (; i.lines.length > 50;) {
                                    var l = i.lines.splice(i.lines.length - 25, 25),
                                        a = new on(l);
                                    i.height -= a.height, this.children.splice(n + 1, 0, a), a.parent = this
                                }
                                this.maybeSpill()
                            }
                            break
                        }
                        e -= o
                    }
                },
                maybeSpill: function() {
                    if (!(this.children.length <= 10)) {
                        var e = this;
                        do {
                            var t = e.children.splice(e.children.length - 5, 5),
                                r = new ln(t);
                            if (e.parent) {
                                e.size -= r.size, e.height -= r.height;
                                var n = Kn(e.parent.children, e);
                                e.parent.children.splice(n + 1, 0, r)
                            } else {
                                var i = new ln(e.children);
                                i.parent = e, e.children = [i, r], e = i
                            }
                            r.parent = e.parent
                        } while (e.children.length > 10);
                        e.parent.maybeSpill()
                    }
                },
                iterN: function(e, t, r) {
                    for (var n = 0; n < this.children.length; ++n) {
                        var i = this.children[n],
                            o = i.chunkSize();
                        if (e < o) {
                            var l = Math.min(t, o - e);
                            if (i.iterN(e, l, r)) return !0;
                            if (0 == (t -= l)) break;
                            e = 0
                        } else e -= o
                    }
                }
            };
            var To = 0,
                No = e.Doc = function(e, t, r) {
                    if (!(this instanceof No)) return new No(e, t, r);
                    null == r && (r = 0), ln.call(this, [new on([new So("", null)])]), this.first = r, this.scrollTop = this.scrollLeft = 0, this.cantEdit = !1, this.cleanGeneration = 1, this.frontier = r;
                    var n = Ui(r, 0);
                    this.sel = Y(n), this.history = new mn(null), this.id = ++To, this.modeOption = t, "string" == typeof e && (e = rl(e)), nn(this, {
                        from: n,
                        to: n,
                        text: e
                    }), le(this, Y(n), Go)
                };
            No.prototype = Xn(ln.prototype, {
                constructor: No,
                iter: function(e, t, r) {
                    r ? this.iterN(e - this.first, t - e, r) : this.iterN(this.first, this.first + this.size, e)
                },
                insert: function(e, t) {
                    for (var r = 0, n = 0; n < t.length; ++n) r += t[n].height;
                    this.insertInner(e - this.first, t, r)
                },
                remove: function(e, t) {
                    this.removeInner(e - this.first, t)
                },
                getValue: function(e) {
                    var t = fn(this, this.first, this.first + this.size);
                    return e === !1 ? t : t.join(e || "\n")
                },
                setValue: Ze(function(e) {
                    var t = Ui(this.first, 0),
                        r = this.first + this.size - 1;
                    Kt(this, {
                        from: t,
                        to: Ui(r, un(this, r).text.length),
                        text: rl(e),
                        origin: "setValue"
                    }, !0), le(this, Y(t))
                }),
                replaceRange: function(e, t, r, n) {
                    t = $(this, t), r = r ? $(this, r) : t, qt(this, e, t, r, n)
                },
                getRange: function(e, t, r) {
                    var n = cn(this, $(this, e), $(this, t));
                    return r === !1 ? n : n.join(r || "\n")
                },
                getLine: function(e) {
                    var t = this.getLineHandle(e);
                    return t && t.text
                },
                getLineHandle: function(e) {
                    if (Z(this, e)) return un(this, e)
                },
                getLineNumber: function(e) {
                    return dn(e)
                },
                getLineHandleVisualStart: function(e) {
                    return "number" == typeof e && (e = un(this, e)), Dr(e)
                },
                lineCount: function() {
                    return this.size
                },
                firstLine: function() {
                    return this.first
                },
                lastLine: function() {
                    return this.first + this.size - 1
                },
                clipPos: function(e) {
                    return $(this, e)
                },
                getCursor: function(e) {
                    var t, r = this.sel.primary();
                    return t = null == e || "head" == e ? r.head : "anchor" == e ? r.anchor : "end" == e || "to" == e || e === !1 ? r.to() : r.from()
                },
                listSelections: function() {
                    return this.sel.ranges
                },
                somethingSelected: function() {
                    return this.sel.somethingSelected()
                },
                setCursor: Ze(function(e, t, r) {
                    ne(this, $(this, "number" == typeof e ? Ui(e, t || 0) : e), null, r)
                }),
                setSelection: Ze(function(e, t, r) {
                    ne(this, $(this, e), $(this, t || e), r)
                }),
                extendSelection: Ze(function(e, t, r) {
                    ee(this, $(this, e), t && $(this, t), r)
                }),
                extendSelections: Ze(function(e, t) {
                    te(this, Q(this, e, t))
                }),
                extendSelectionsBy: Ze(function(e, t) {
                    te(this, _n(this.sel.ranges, e), t)
                }),
                setSelections: Ze(function(e, t, r) {
                    if (e.length) {
                        for (var n = 0, i = []; n < e.length; n++) i[n] = new _($(this, e[n].anchor), $(this, e[n].head));
                        null == t && (t = Math.min(e.length - 1, this.sel.primIndex)), le(this, X(i, t), r)
                    }
                }),
                addSelection: Ze(function(e, t, r) {
                    var n = this.sel.ranges.slice(0);
                    n.push(new _($(this, e), $(this, t || e))), le(this, X(n, n.length - 1), r)
                }),
                getSelection: function(e) {
                    for (var t, r = this.sel.ranges, n = 0; n < r.length; n++) {
                        var i = cn(this, r[n].from(), r[n].to());
                        t = t ? t.concat(i) : i
                    }
                    return e === !1 ? t : t.join(e || "\n")
                },
                getSelections: function(e) {
                    for (var t = [], r = this.sel.ranges, n = 0; n < r.length; n++) {
                        var i = cn(this, r[n].from(), r[n].to());
                        e !== !1 && (i = i.join(e || "\n")), t[n] = i
                    }
                    return t
                },
                replaceSelection: Ze(function(e, t, r) {
                    for (var n = [], i = 0; i < this.sel.ranges.length; i++) n[i] = e;
                    this.replaceSelections(n, t, r || "+input")
                }),
                replaceSelections: function(e, t, r) {
                    for (var n = [], i = this.sel, o = 0; o < i.ranges.length; o++) {
                        var l = i.ranges[o];
                        n[o] = {
                            from: l.from(),
                            to: l.to(),
                            text: rl(e[o]),
                            origin: r
                        }
                    }
                    for (var a = t && "end" != t && Vt(this, n, t), o = n.length - 1; o >= 0; o--) Kt(this, n[o]);
                    a ? oe(this, a) : this.cm && rr(this.cm)
                },
                undo: Ze(function() {
                    Xt(this, "undo")
                }),
                redo: Ze(function() {
                    Xt(this, "redo")
                }),
                undoSelection: Ze(function() {
                    Xt(this, "undo", !0)
                }),
                redoSelection: Ze(function() {
                    Xt(this, "redo", !0)
                }),
                setExtending: function(e) {
                    this.extend = e
                },
                getExtending: function() {
                    return this.extend
                },
                historySize: function() {
                    for (var e = this.history, t = 0, r = 0, n = 0; n < e.done.length; n++) e.done[n].ranges || ++t;
                    for (var n = 0; n < e.undone.length; n++) e.undone[n].ranges || ++r;
                    return {
                        undo: t,
                        redo: r
                    }
                },
                clearHistory: function() {
                    this.history = new mn(this.history.maxGeneration)
                },
                markClean: function() {
                    this.cleanGeneration = this.changeGeneration(!0)
                },
                changeGeneration: function(e) {
                    return e && (this.history.lastOp = this.history.lastOrigin = null), this.history.generation
                },
                isClean: function(e) {
                    return this.history.generation == (e || this.cleanGeneration)
                },
                getHistory: function() {
                    return {
                        done: Nn(this.history.done),
                        undone: Nn(this.history.undone)
                    }
                },
                setHistory: function(e) {
                    var t = this.history = new mn(this.history.maxGeneration);
                    t.done = Nn(e.done.slice(0), null, !0), t.undone = Nn(e.undone.slice(0), null, !0)
                },
                markText: function(e, t, r) {
                    return hr(this, $(this, e), $(this, t), r, "range")
                },
                setBookmark: function(e, t) {
                    var r = {
                        replacedWith: t && (null == t.nodeType ? t.widget : t),
                        insertLeft: t && t.insertLeft,
                        clearWhenEmpty: !1,
                        shared: t && t.shared
                    };
                    return e = $(this, e), hr(this, e, e, r, "bookmark")
                },
                findMarksAt: function(e) {
                    e = $(this, e);
                    var t = [],
                        r = un(this, e.line).markedSpans;
                    if (r)
                        for (var n = 0; n < r.length; ++n) {
                            var i = r[n];
                            (null == i.from || i.from <= e.ch) && (null == i.to || i.to >= e.ch) && t.push(i.marker.parent || i.marker)
                        }
                    return t
                },
                findMarks: function(e, t) {
                    e = $(this, e), t = $(this, t);
                    var r = [],
                        n = e.line;
                    return this.iter(e.line, t.line + 1, function(i) {
                        var o = i.markedSpans;
                        if (o)
                            for (var l = 0; l < o.length; l++) {
                                var a = o[l];
                                n == e.line && e.ch > a.to || null == a.from && n != e.line || n == t.line && a.from > t.ch || r.push(a.marker.parent || a.marker)
                            }++n
                    }), r
                },
                getAllMarks: function() {
                    var e = [];
                    return this.iter(function(t) {
                        var r = t.markedSpans;
                        if (r)
                            for (var n = 0; n < r.length; ++n) null != r[n].from && e.push(r[n].marker)
                    }), e
                },
                posFromIndex: function(e) {
                    var t, r = this.first;
                    return this.iter(function(n) {
                        var i = n.text.length + 1;
                        return i > e ? (t = e, !0) : (e -= i, void++r)
                    }), $(this, Ui(r, t))
                },
                indexFromPos: function(e) {
                    e = $(this, e);
                    var t = e.ch;
                    return e.line < this.first || e.ch < 0 ? 0 : (this.iter(this.first, e.line, function(e) {
                        t += e.text.length + 1
                    }), t)
                },
                copy: function(e) {
                    var t = new No(fn(this, this.first, this.first + this.size), this.modeOption, this.first);
                    return t.scrollTop = this.scrollTop, t.scrollLeft = this.scrollLeft, t.sel = this.sel, t.extend = !1, e && (t.history.undoDepth = this.history.undoDepth, t.setHistory(this.getHistory())), t
                },
                linkedDoc: function(e) {
                    e || (e = {});
                    var t = this.first,
                        r = this.first + this.size;
                    null != e.from && e.from > t && (t = e.from), null != e.to && e.to < r && (r = e.to);
                    var n = new No(fn(this, t, r), e.mode || this.modeOption, t);
                    return e.sharedHist && (n.history = this.history), (this.linked || (this.linked = [])).push({
                        doc: n,
                        sharedHist: e.sharedHist
                    }), n.linked = [{
                        doc: this,
                        isParent: !0,
                        sharedHist: e.sharedHist
                    }], n
                },
                unlinkDoc: function(t) {
                    if (t instanceof e && (t = t.doc), this.linked)
                        for (var r = 0; r < this.linked.length; ++r) {
                            var n = this.linked[r];
                            if (n.doc == t) {
                                this.linked.splice(r, 1), t.unlinkDoc(this);
                                break
                            }
                        }
                    if (t.history == this.history) {
                        var i = [t.id];
                        an(t, function(e) {
                            i.push(e.id)
                        }, !0), t.history = new mn(null), t.history.done = Nn(this.history.done, i), t.history.undone = Nn(this.history.undone, i)
                    }
                },
                iterLinkedDocs: function(e) {
                    an(this, e)
                },
                getMode: function() {
                    return this.mode
                },
                getEditor: function() {
                    return this.cm
                }
            }), No.prototype.eachLine = No.prototype.iter;
            var Oo = "iter insert remove copy getEditor".split(" ");
            for (var Ho in No.prototype) No.prototype.hasOwnProperty(Ho) && Kn(Oo, Ho) < 0 && (e.prototype[Ho] = function(e) {
                return function() {
                    return e.apply(this.doc, arguments)
                }
            }(No.prototype[Ho]));
            Fn(No);
            var Ao, Wo = e.e_preventDefault = function(e) {
                    e.preventDefault ? e.preventDefault() : e.returnValue = !1
                },
                Do = e.e_stopPropagation = function(e) {
                    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
                },
                Io = e.e_stop = function(e) {
                    Wo(e), Do(e)
                },
                Eo = e.on = function(e, t, r) {
                    if (e.addEventListener) e.addEventListener(t, r, !1);
                    else if (e.attachEvent) e.attachEvent("on" + t, r);
                    else {
                        var n = e._handlers || (e._handlers = {}),
                            i = n[t] || (n[t] = []);
                        i.push(r)
                    }
                },
                zo = e.off = function(e, t, r) {
                    if (e.removeEventListener) e.removeEventListener(t, r, !1);
                    else if (e.detachEvent) e.detachEvent("on" + t, r);
                    else {
                        var n = e._handlers && e._handlers[t];
                        if (!n) return;
                        for (var i = 0; i < n.length; ++i)
                            if (n[i] == r) {
                                n.splice(i, 1);
                                break
                            }
                    }
                },
                Ro = e.signal = function(e, t) {
                    var r = e._handlers && e._handlers[t];
                    if (r)
                        for (var n = Array.prototype.slice.call(arguments, 2), i = 0; i < r.length; ++i) r[i].apply(null, n)
                },
                Po = 0,
                Fo = 30,
                Bo = e.Pass = {
                    toString: function() {
                        return "CodeMirror.Pass"
                    }
                },
                Go = {
                    scroll: !1
                },
                Vo = {
                    origin: "*mouse"
                },
                Uo = {
                    origin: "+move"
                };
            Bn.prototype.set = function(e, t) {
                clearTimeout(this.id), this.id = setTimeout(t, e)
            };
            var Ko = e.countColumn = function(e, t, r, n, i) {
                    null == t && (t = e.search(/[^\s\u00a0]/), t == -1 && (t = e.length));
                    for (var o = n || 0, l = i || 0;;) {
                        var a = e.indexOf("\t", o);
                        if (a < 0 || a >= t) return l + (t - o);
                        l += a - o, l += r - l % r, o = a + 1
                    }
                },
                _o = [""],
                Xo = function(e) {
                    e.select()
                };
            Ii ? Xo = function(e) {
                e.selectionStart = 0, e.selectionEnd = e.value.length
            } : Si && (Xo = function(e) {
                try {
                    e.select()
                } catch (e) {}
            }), [].indexOf && (Kn = function(e, t) {
                return e.indexOf(t)
            }), [].map && (_n = function(e, t) {
                return e.map(t)
            });
            var Yo, jo = /[\u00df\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/,
                $o = e.isWordChar = function(e) {
                    return /\w/.test(e) || e > "" && (e.toUpperCase() != e.toLowerCase() || jo.test(e))
                },
                qo = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/,
                Zo = {};
            Yo = document.createRange ? function(e, t, r) {
                var n = document.createRange();
                return n.setEnd(e, r), n.setStart(e, t), n
            } : function(e, t, r) {
                var n = document.body.createTextRange();
                return n.moveToElementText(e.parentNode), n.collapse(!0), n.moveEnd("character", r), n.moveStart("character", t), n
            }, bi && (ri = function() {
                try {
                    return document.activeElement
                } catch (e) {
                    return document.body
                }
            });
            var Qo, Jo, el, tl = function() {
                    if (wi) return !1;
                    var e = Qn("div");
                    return "draggable" in e || "dragDrop" in e
                }(),
                rl = e.splitLines = 3 != "\n\nb".split(/\n/).length ? function(e) {
                    for (var t = 0, r = [], n = e.length; t <= n;) {
                        var i = e.indexOf("\n", t);
                        i == -1 && (i = e.length);
                        var o = e.slice(t, "\r" == e.charAt(i - 1) ? i - 1 : i),
                            l = o.indexOf("\r");
                        l != -1 ? (r.push(o.slice(0, l)), t += l + 1) : (r.push(o), t = i + 1)
                    }
                    return r
                } : function(e) {
                    return e.split(/\r\n?|\n/)
                },
                nl = window.getSelection ? function(e) {
                    try {
                        return e.selectionStart != e.selectionEnd
                    } catch (e) {
                        return !1
                    }
                } : function(e) {
                    try {
                        var t = e.ownerDocument.selection.createRange()
                    } catch (e) {}
                    return !(!t || t.parentElement() != e) && 0 != t.compareEndPoints("StartToEnd", t)
                },
                il = function() {
                    var e = Qn("div");
                    return "oncopy" in e || (e.setAttribute("oncopy", "return;"), "function" == typeof e.oncopy)
                }(),
                ol = {
                    3: "Enter",
                    8: "Backspace",
                    9: "Tab",
                    13: "Enter",
                    16: "Shift",
                    17: "Ctrl",
                    18: "Alt",
                    19: "Pause",
                    20: "CapsLock",
                    27: "Esc",
                    32: "Space",
                    33: "PageUp",
                    34: "PageDown",
                    35: "End",
                    36: "Home",
                    37: "Left",
                    38: "Up",
                    39: "Right",
                    40: "Down",
                    44: "PrintScrn",
                    45: "Insert",
                    46: "Delete",
                    59: ";",
                    61: "=",
                    91: "Mod",
                    92: "Mod",
                    93: "Mod",
                    107: "=",
                    109: "-",
                    127: "Delete",
                    173: "-",
                    186: ";",
                    187: "=",
                    188: ",",
                    189: "-",
                    190: ".",
                    191: "/",
                    192: "`",
                    219: "[",
                    220: "\\",
                    221: "]",
                    222: "'",
                    63232: "Up",
                    63233: "Down",
                    63234: "Left",
                    63235: "Right",
                    63272: "Delete",
                    63273: "Home",
                    63275: "End",
                    63276: "PageUp",
                    63277: "PageDown",
                    63302: "Insert"
                };
            e.keyNames = ol,
                function() {
                    for (var e = 0; e < 10; e++) ol[e + 48] = ol[e + 96] = String(e);
                    for (var e = 65; e <= 90; e++) ol[e] = String.fromCharCode(e);
                    for (var e = 1; e <= 12; e++) ol[e + 111] = ol[e + 63235] = "F" + e
                }();
            var ll, al = function() {
                function e(e) {
                    return e <= 247 ? r.charAt(e) : 1424 <= e && e <= 1524 ? "R" : 1536 <= e && e <= 1773 ? n.charAt(e - 1536) : 1774 <= e && e <= 2220 ? "r" : 8192 <= e && e <= 8203 ? "w" : 8204 == e ? "b" : "L"
                }

                function t(e, t, r) {
                    this.level = e, this.from = t, this.to = r
                }
                var r = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN",
                    n = "rrrrrrrrrrrr,rNNmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmrrrrrrrnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmNmmmm",
                    i = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,
                    o = /[stwN]/,
                    l = /[LRr]/,
                    a = /[Lb1n]/,
                    s = /[1n]/,
                    u = "L";
                return function(r) {
                    if (!i.test(r)) return !1;
                    for (var n, c = r.length, f = [], h = 0; h < c; ++h) f.push(n = e(r.charCodeAt(h)));
                    for (var h = 0, d = u; h < c; ++h) {
                        var n = f[h];
                        "m" == n ? f[h] = d : d = n
                    }
                    for (var h = 0, p = u; h < c; ++h) {
                        var n = f[h];
                        "1" == n && "r" == p ? f[h] = "n" : l.test(n) && (p = n, "r" == n && (f[h] = "R"))
                    }
                    for (var h = 1, d = f[0]; h < c - 1; ++h) {
                        var n = f[h];
                        "+" == n && "1" == d && "1" == f[h + 1] ? f[h] = "1" : "," != n || d != f[h + 1] || "1" != d && "n" != d || (f[h] = d), d = n
                    }
                    for (var h = 0; h < c; ++h) {
                        var n = f[h];
                        if ("," == n) f[h] = "N";
                        else if ("%" == n) {
                            for (var g = h + 1; g < c && "%" == f[g]; ++g);
                            for (var v = h && "!" == f[h - 1] || g < c && "1" == f[g] ? "1" : "N", m = h; m < g; ++m) f[m] = v;
                            h = g - 1
                        }
                    }
                    for (var h = 0, p = u; h < c; ++h) {
                        var n = f[h];
                        "L" == p && "1" == n ? f[h] = "L" : l.test(n) && (p = n)
                    }
                    for (var h = 0; h < c; ++h)
                        if (o.test(f[h])) {
                            for (var g = h + 1; g < c && o.test(f[g]); ++g);
                            for (var y = "L" == (h ? f[h - 1] : u), b = "L" == (g < c ? f[g] : u), v = y || b ? "L" : "R", m = h; m < g; ++m) f[m] = v;
                            h = g - 1
                        }
                    for (var x, w = [], h = 0; h < c;)
                        if (a.test(f[h])) {
                            var C = h;
                            for (++h; h < c && a.test(f[h]); ++h);
                            w.push(new t(0, C, h))
                        } else {
                            var L = h,
                                S = w.length;
                            for (++h; h < c && "L" != f[h]; ++h);
                            for (var m = L; m < h;)
                                if (s.test(f[m])) {
                                    L < m && w.splice(S, 0, new t(1, L, m));
                                    var k = m;
                                    for (++m; m < h && s.test(f[m]); ++m);
                                    w.splice(S, 0, new t(2, k, m)), L = m
                                } else ++m;
                            L < h && w.splice(S, 0, new t(1, L, h))
                        }
                    return 1 == w[0].level && (x = r.match(/^\s+/)) && (w[0].from = x[0].length, w.unshift(new t(0, 0, x[0].length))), 1 == Un(w).level && (x = r.match(/\s+$/)) && (Un(w).to -= x[0].length, w.push(new t(0, c - x[0].length, c))), w[0].level != Un(w).level && w.push(new t(w[0].level, c, c)), w
                }
            }();
            return e.version = "4.0.3", e
        });
    
        colorPalettesAliases = {
            1: "mastersystem",
            2: "gameboycolour",
            3: "amiga",
            4: "arnecolors",
            5: "famicom",
            6: "atari",
            7: "pastel",
            8: "ega",
            9: "amstrad",
            10: "proteus_mellow",
            11: "proteus_rich",
            12: "proteus_night",
            13: "c64",
            14: "whitingjp"
        }, colorPalettes = {
            mastersystem: {
                black: "#000000",
                white: "#FFFFFF",
                grey: "#555555",
                darkgrey: "#555500",
                lightgrey: "#AAAAAA",
                gray: "#555555",
                darkgray: "#555500",
                lightgray: "#AAAAAA",
                red: "#FF0000",
                darkred: "#AA0000",
                lightred: "#FF5555",
                brown: "#AA5500",
                darkbrown: "#550000",
                lightbrown: "#FFAA00",
                orange: "#FF5500",
                yellow: "#FFFF55",
                green: "#55AA00",
                darkgreen: "#005500",
                lightgreen: "#AAFF00",
                blue: "#5555AA",
                lightblue: "#AAFFFF",
                darkblue: "#000055",
                purple: "#550055",
                pink: "#FFAAFF"
            },
            gameboycolour: {
                black: "#000000",
                white: "#FFFFFF",
                grey: "#7F7F7C",
                darkgrey: "#3E3E44",
                lightgrey: "#BAA7A7",
                gray: "#7F7F7C",
                darkgray: "#3E3E44",
                lightgray: "#BAA7A7",
                red: "#A7120C",
                darkred: "#880606",
                lightred: "#BA381F",
                brown: "#57381F",
                darkbrown: "#3E2519",
                lightbrown: "#8E634B",
                orange: "#BA4B32",
                yellow: "#C0BA6F",
                green: "#517525",
                darkgreen: "#385D12",
                lightgreen: "#6F8E44",
                blue: "#5D6FA7",
                lightblue: "#8EA7A7",
                darkblue: "#4B575D",
                purple: "#3E3E44",
                pink: "#BA381F"
            },
            amiga: {
                black: "#000000",
                white: "#FFFFFF",
                grey: "#BBBBBB",
                darkgrey: "#333333",
                lightgrey: "#FFEEDD",
                gray: "#BBBBBB",
                darkgray: "#333333",
                lightgray: "#FFEEDD",
                red: "#DD1111",
                darkred: "#990000",
                lightred: "#FF4422",
                brown: "#663311",
                darkbrown: "#331100",
                lightbrown: "#AA6644",
                orange: "#FF6644",
                yellow: "#FFDD66",
                green: "#448811",
                darkgreen: "#335500",
                lightgreen: "#88BB77",
                blue: "#8899DD",
                lightblue: "#BBDDEE",
                darkblue: "#666688",
                purple: "#665555",
                pink: "#997788"
            },
            arnecolors: {
                black: "#000000",
                white: "#FFFFFF",
                grey: "#9d9d9d",
                darkgrey: "#697175",
                lightgrey: "#cccccc",
                gray: "#9d9d9d",
                darkgray: "#697175",
                lightgray: "#cccccc",
                red: "#be2633",
                darkred: "#732930",
                lightred: "#e06f8b",
                brown: "#a46422",
                darkbrown: "#493c2b",
                lightbrown: "#eeb62f",
                orange: "#eb8931",
                yellow: "#f7e26b",
                green: "#44891a",
                darkgreen: "#2f484e",
                lightgreen: "#a3ce27",
                blue: "#1d57f7",
                lightblue: "#B2DCEF",
                darkblue: "#1B2632",
                purple: "#342a97",
                pink: "#de65e2"
            },
            famicom: {
                black: "#000000",
                white: "#ffffff",
                grey: "#7c7c7c",
                darkgrey: "#080808",
                lightgrey: "#bcbcbc",
                gray: "#7c7c7c",
                darkgray: "#080808",
                lightgray: "#bcbcbc",
                red: "#f83800",
                darkred: "#881400",
                lightred: "#f87858",
                brown: "#AC7C00",
                darkbrown: "#503000",
                lightbrown: "#FCE0A8",
                orange: "#FCA044",
                yellow: "#F8B800",
                green: "#00B800",
                darkgreen: "#005800",
                lightgreen: "#B8F8B8",
                blue: "#0058F8",
                lightblue: "#3CBCFC",
                darkblue: "#0000BC",
                purple: "#6644FC",
                pink: "#F878F8"
            },
            atari: {
                black: "#000000",
                white: "#FFFFFF",
                grey: "#909090",
                darkgrey: "#404040",
                lightgrey: "#b0b0b0",
                gray: "#909090",
                darkgray: "#404040",
                lightgray: "#b0b0b0",
                red: "#A03C50",
                darkred: "#700014",
                lightred: "#DC849C",
                brown: "#805020",
                darkbrown: "#703400",
                lightbrown: "#CB9870",
                orange: "#CCAC70",
                yellow: "#ECD09C",
                green: "#58B06C",
                darkgreen: "#006414",
                lightgreen: "#70C484",
                blue: "#1C3C88",
                lightblue: "#6888C8",
                darkblue: "#000088",
                purple: "#3C0080",
                pink: "#B484DC"
            },
            pastel: {
                black: "#000000",
                white: "#FFFFFF",
                grey: "#3e3e3e",
                darkgrey: "#313131",
                lightgrey: "#9cbcbc",
                gray: "#3e3e3e",
                darkgray: "#313131",
                lightgray: "#9cbcbc",
                red: "#f56ca2",
                darkred: "#a63577",
                lightred: "#ffa9cf",
                brown: "#b58c53",
                darkbrown: "#787562",
                lightbrown: "#B58C53",
                orange: "#EB792D",
                yellow: "#FFe15F",
                green: "#00FF4F",
                darkgreen: "#2b732c",
                lightgreen: "#97c04f",
                blue: "#0f88d3",
                lightblue: "#00fffe",
                darkblue: "#293a7b",
                purple: "#ff6554",
                pink: "#eb792d"
            },
            ega: {
                black: "#000000",
                white: "#ffffff",
                grey: "#555555",
                darkgrey: "#555555",
                lightgrey: "#aaaaaa",
                gray: "#555555",
                darkgray: "#555555",
                lightgray: "#aaaaaa",
                red: "#ff5555",
                darkred: "#aa0000",
                lightred: "#ff55ff",
                brown: "#aa5500",
                darkbrown: "#aa5500",
                lightbrown: "#ffff55",
                orange: "#ff5555",
                yellow: "#ffff55",
                green: "#00aa00",
                darkgreen: "#00aaaa",
                lightgreen: "#55ff55",
                blue: "#5555ff",
                lightblue: "#55ffff",
                darkblue: "#0000aa",
                purple: "#aa00aa",
                pink: "#ff55ff"
            },
            proteus_mellow: {
                black: "#3d2d2e",
                white: "#ddf1fc",
                grey: "#9fb2d4",
                darkgrey: "#7b8272",
                lightgrey: "#a4bfda",
                gray: "#9fb2d4",
                darkgray: "#7b8272",
                lightgray: "#a4bfda",
                red: "#9d5443",
                darkred: "#8c5b4a",
                lightred: "#94614c",
                brown: "#89a78d",
                darkbrown: "#829e88",
                lightbrown: "#aaae97",
                orange: "#d1ba86",
                yellow: "#d6cda2",
                green: "#75ac8d",
                darkgreen: "#8fa67f",
                lightgreen: "#8eb682",
                blue: "#88a3ce",
                lightblue: "#a5adb0",
                darkblue: "#5c6b8c",
                purple: "#d39fac",
                pink: "#c8ac9e"
            },
            proteus_night: {
                black: "#010912",
                white: "#fdeeec",
                grey: "#051d40",
                darkgrey: "#091842",
                lightgrey: "#062151",
                gray: "#051d40",
                darkgray: "#091842",
                lightgray: "#062151",
                red: "#ad4576",
                darkred: "#934765",
                lightred: "#ab6290",
                brown: "#61646b",
                darkbrown: "#3d2d2d",
                lightbrown: "#8393a0",
                orange: "#0a2227",
                yellow: "#0a2541",
                green: "#75ac8d",
                darkgreen: "#0a2434",
                lightgreen: "#061f2e",
                blue: "#0b2c79",
                lightblue: "#809ccb",
                darkblue: "#08153b",
                purple: "#666a87",
                pink: "#754b4d"
            },
            proteus_rich: {
                black: "#6f686f",
                white: "#d1b1e2",
                grey: "#b9aac1",
                darkgrey: "#8e8b84",
                lightgrey: "#c7b5cd",
                gray: "#b9aac1",
                darkgray: "#8e8b84",
                lightgray: "#c7b5cd",
                red: "#a11f4f",
                darkred: "#934765",
                lightred: "#c998ad",
                brown: "#89867d",
                darkbrown: "#797f75",
                lightbrown: "#ab9997",
                orange: "#ce8c5c",
                yellow: "#f0d959",
                green: "#75bc54",
                darkgreen: "#599d79",
                lightgreen: "#90cf5c",
                blue: "#8fd0ec",
                lightblue: "#bcdce7",
                darkblue: "#0b2c70",
                purple: "#9b377f",
                pink: "#cd88e5"
            },
            amstrad: {
                black: "#000000",
                white: "#ffffff",
                grey: "#7f7f7f",
                darkgrey: "#636363",
                lightgrey: "#afafaf",
                gray: "#7f7f7f",
                darkgray: "#636363",
                lightgray: "#afafaf",
                red: "#ff0000",
                darkred: "#7f0000",
                lightred: "#ff7f7f",
                brown: "#ff7f00",
                darkbrown: "#7f7f00",
                lightbrown: "#ffff00",
                orange: "#ff007f",
                yellow: "#ffff7f",
                green: "#01ff00",
                darkgreen: "#007f00",
                lightgreen: "#7fff7f",
                blue: "#0000ff",
                lightblue: "#7f7fff",
                darkblue: "#00007f",
                purple: "#7f007f",
                pink: "#ff7fff"
            },
            c64: {
                black: "#000000",
                white: "#ffffff",
                grey: "#6C6C6C",
                darkgrey: "#444444",
                lightgrey: "#959595",
                gray: "#6C6C6C",
                darkgray: "#444444",
                lightgray: "#959595",
                red: "#68372B",
                darkred: "#3f1e17",
                lightred: "#9A6759",
                brown: "#433900",
                darkbrown: "#221c02",
                lightbrown: "#6d5c0d",
                orange: "#6F4F25",
                yellow: "#B8C76F",
                green: "#588D43",
                darkgreen: "#345129",
                lightgreen: "#9AD284",
                blue: "#6C5EB5",
                lightblue: "#70A4B2",
                darkblue: "#352879",
                purple: "#6F3D86",
                pink: "#b044ac"
            },
            whitingjp: {
                black: "#202527",
                white: "#eff8fd",
                grey: "#7b7680",
                darkgrey: "#3c3b44",
                lightgrey: "#bed0d7",
                gray: "#7b7680",
                darkgray: "#3c3b44",
                lightgray: "#bed0d7",
                red: "#bd194b",
                darkred: "#6b1334",
                lightred: "#ef2358",
                brown: "#b52e1c",
                darkbrown: "#681c12",
                lightbrown: "#e87b45",
                orange: "#ff8c10",
                yellow: "#fbd524",
                green: "#36bc3c",
                darkgreen: "#317610",
                lightgreen: "#8ce062",
                blue: "#3f62c6",
                lightblue: "#57bbe0",
                darkblue: "#2c2fa0",
                purple: "#7037d9",
                pink: "#ec2b8f"
            }
        };
        var reg_color_names = /(black|white|darkgray|lightgray|gray|grey|darkgrey|lightgrey|red|darkred|lightred|brown|darkbrown|lightbrown|orange|yellow|green|darkgreen|lightgreen|blue|lightblue|darkblue|purple|pink|transparent)\s*/,
            reg_color = /(black|white|gray|darkgray|lightgray|grey|darkgrey|lightgrey|red|darkred|lightred|brown|darkbrown|lightbrown|orange|yellow|green|darkgreen|lightgreen|blue|lightblue|darkblue|purple|pink|transparent|#(?:[0-9a-f]{3}){1,2})\s*/;
    
        function createSprite(e, t, l, i) {
            void 0 === l && (l = [state.bgcolor, state.fgcolor]);
            var h = makeSpriteCanvas(e),
                o = h.getContext("2d");
            o.clearRect(0, 0, cellwidth, cellheight);
            var c = t[0].length,
                r = t.length,
                a = ~~(cellwidth / (c + (0 | i))),
                s = ~~(cellheight / (r + (0 | i))),
                n = s;
            "scanline" in state.metadata && (n = Math.ceil(s / 2)), o.fillStyle = state.fgcolor;
            for (var d = 0; d < c; d++)
                for (var g = 0; g < r; g++) {
                    var f = t[d][g];
                    if (f >= 0) {
                        var w = d * a | 0,
                            v = g * s | 0;
                        o.fillStyle = l[f], o.fillRect(v, w, a, n)
                    }
                }
            return h
        }

        function regenText(e, t) {
            textImages = {};
            for (var l in font) font.hasOwnProperty(l) && (textImages[l] = createSprite("char" + l, font[l], void 0, 1))
        }

        function regenSpriteImages() {
            if (textMode) return void regenText();
            if (levelEditorOpened && (textImages.s = createSprite("chars", font.s, void 0)), 0 !== state.levels.length) {
                spriteimages = [];
                for (var e = 0; e < sprites.length; e++) void 0 != sprites[e] && (spriteimages[e] = createSprite(e.toString(), sprites[e].dat, sprites[e].colors));
                canOpenEditor && generateGlyphImages()
            }
        }

        function makeSpriteCanvas(e) {
            var t;
            return e in canvasdict ? t = canvasdict[e] : (t = document.createElement("canvas"), canvasdict[e] = t), t.width = cellwidth, t.height = cellheight, t
        }

        function generateGlyphImages() {
            if (0 !== cellwidth && 0 !== cellheight) {
                glyphImagesCorrespondance = [], glyphImages = [];
                for (var e in state.glyphDict)
                    if (1 == e.length && state.glyphDict.hasOwnProperty(e)) {
                        var t = state.glyphDict[e],
                            l = makeSpriteCanvas("C" + e),
                            i = l.getContext("2d");
                        glyphImagesCorrespondance.push(e);
                        for (var h = 0; h < t.length; h++) {
                            var o = t[h];
                            o !== -1 && i.drawImage(spriteimages[o], 0, 0)
                        }
                        glyphImages.push(l)
                    }
                glyphHighlight = makeSpriteCanvas("highlight");
                var i = glyphHighlight.getContext("2d");
                i.fillStyle = "#FFFFFF", i.fillRect(0, 0, cellwidth, 1), i.fillRect(0, 0, 1, cellheight), i.fillRect(0, cellheight - 1, cellwidth, 1), i.fillRect(cellwidth - 1, 0, 1, cellheight), glyphPrintButton = textImages.s, glyphHighlightResize = makeSpriteCanvas("highlightresize");
                var i = glyphHighlightResize.getContext("2d");
                i.fillStyle = "#FFFFFF";
                var c = cellwidth / 2 - 1 | 0,
                    r = cellwidth - c - 1 - c,
                    a = cellheight / 2 - 1 | 0,
                    s = cellheight - a - 1 - c;
                i.fillRect(c, 0, r, cellheight), i.fillRect(0, a, cellwidth, s), glyphMouseOver = makeSpriteCanvas();
                var i = glyphMouseOver.getContext("2d");
                i.fillStyle = "yellow", i.fillRect(0, 0, cellwidth, 2), i.fillRect(0, 0, 2, cellheight), i.fillRect(0, cellheight - 2, cellwidth, 2), i.fillRect(cellwidth - 2, 0, 2, cellheight)
            }
        }

        function glyphCount() {
            var e = 0;
            for (var t in state.glyphDict) 1 == t.length && state.glyphDict.hasOwnProperty(t) && e++;
            return e
        }

        function redraw() {
            if (0 !== cellwidth && 0 !== cellheight)
                if (void 0 === spriteimages && regenSpriteImages(), textMode) {
                    ctx.fillStyle = state.bgcolor, ctx.fillRect(0, 0, canvas.width, canvas.height);
                    for (var e = 0; e < titleWidth; e++)
                        for (var t = 0; t < titleHeight; t++) {
                            var l = titleImage[t].charAt(e);
                            if (l in textImages) {
                                var i = textImages[l];
                                ctx.drawImage(i, xoffset + e * cellwidth, yoffset + t * cellheight)
                            }
                        }
                } else {
                    ctx.fillStyle = state.bgcolor, ctx.fillRect(0, 0, canvas.width, canvas.height);
                    var h = 0,
                        o = screenwidth,
                        c = 0,
                        r = screenheight;
                    if (levelEditorOpened) {
                        var a = glyphCount();
                        editorRowCount = Math.ceil(a / (screenwidth - 1)), o -= 2, r -= 2 + editorRowCount
                    } else if (flickscreen) {
                        var s = getPlayerPositions();
                        if (s.length > 0) {
                            var n = s[0],
                                d = n / level.height | 0,
                                g = n % level.height | 0,
                                f = d / screenwidth | 0,
                                w = g / screenheight | 0;
                            h = f * screenwidth, c = w * screenheight, o = Math.min(h + screenwidth, level.width), r = Math.min(c + screenheight, level.height), oldflickscreendat = [h, c, o, r]
                        } else oldflickscreendat.length > 0 && (h = oldflickscreendat[0], c = oldflickscreendat[1], o = oldflickscreendat[2], r = oldflickscreendat[3])
                    } else if (zoomscreen) {
                        var s = getPlayerPositions();
                        if (s.length > 0) {
                            var n = s[0],
                                d = n / level.height | 0,
                                g = n % level.height | 0;
                            h = Math.max(Math.min(d - (screenwidth / 2 | 0), level.width - screenwidth), 0), c = Math.max(Math.min(g - (screenheight / 2 | 0), level.height - screenheight), 0), o = Math.min(h + screenwidth, level.width), r = Math.min(c + screenheight, level.height), oldflickscreendat = [h, c, o, r]
                        } else oldflickscreendat.length > 0 && (h = oldflickscreendat[0], c = oldflickscreendat[1], o = oldflickscreendat[2], r = oldflickscreendat[3])
                    }
                    for (var e = h; e < o; e++)
                        for (var t = c; t < r; t++)
                            for (var v = t + e * level.height, m = level.getCellInto(v, _o12), p = 0; p < state.objectCount; p++)
                                if (0 != m.get(p)) {
                                    var i = spriteimages[p];
                                    ctx.drawImage(i, xoffset + (e - h) * cellwidth, yoffset + (t - c) * cellheight)
                                }
                    levelEditorOpened && drawEditorIcons()
                }
        }

        function drawEditorIcons() {
            var e = (glyphImages.length, 0),
                t = glyphImages.length,
                l = t - e;
            ctx.drawImage(glyphPrintButton, xoffset - cellwidth, yoffset - cellheight * (1 + editorRowCount)), mouseCoordY === -1 - editorRowCount && mouseCoordX === -1 && ctx.drawImage(glyphMouseOver, xoffset - cellwidth, yoffset - cellheight * (1 + editorRowCount));
            for (var i = editorRowCount - (-mouseCoordY - 2) - 1, h = mouseCoordX + (screenwidth - 1) * i, o = 0; o < l; o++) {
                var c = e + o,
                    r = glyphImages[c],
                    a = o % (screenwidth - 1),
                    i = o / (screenwidth - 1) | 0;
                ctx.drawImage(r, xoffset + a * cellwidth, yoffset + i * cellheight - cellheight * (1 + editorRowCount)), mouseCoordX >= 0 && mouseCoordX < screenwidth - 1 && h === o && ctx.drawImage(glyphMouseOver, xoffset + a * cellwidth, yoffset + i * cellheight - cellheight * (1 + editorRowCount)), o === glyphSelectedIndex && ctx.drawImage(glyphHighlight, xoffset + a * cellwidth, yoffset + i * cellheight - cellheight * (1 + editorRowCount))
            }
            mouseCoordX >= -1 && mouseCoordY >= -1 && mouseCoordX < screenwidth - 1 && mouseCoordY < screenheight - 1 - editorRowCount && (mouseCoordX == -1 || mouseCoordY == -1 || mouseCoordX == screenwidth - 2 || mouseCoordY === screenheight - 2 - editorRowCount ? ctx.drawImage(glyphHighlightResize, xoffset + mouseCoordX * cellwidth, yoffset + mouseCoordY * cellheight) : ctx.drawImage(glyphHighlight, xoffset + mouseCoordX * cellwidth, yoffset + mouseCoordY * cellheight))
        }

        function canvasResize() {
            if (canvas.width = canvas.parentNode.clientWidth, canvas.height = canvas.parentNode.clientHeight, screenwidth = level.width, screenheight = level.height, void 0 !== state)
                if (flickscreen = void 0 !== state.metadata.flickscreen, zoomscreen = void 0 !== state.metadata.zoomscreen, levelEditorOpened) {
                    screenwidth += 2;
                    var e = glyphCount();
                    editorRowCount = Math.ceil(e / (screenwidth - 1)), screenheight += 2 + editorRowCount
                } else flickscreen ? (screenwidth = state.metadata.flickscreen[0], screenheight = state.metadata.flickscreen[1]) : zoomscreen && (screenwidth = state.metadata.zoomscreen[0], screenheight = state.metadata.zoomscreen[1]);
            textMode && (screenwidth = titleWidth, screenheight = titleHeight), cellwidth = canvas.width / screenwidth, cellheight = canvas.height / screenheight;
            var t = 5,
                l = 5;
            textMode && (t = 6, l = 6), cellwidth = t * ~~(cellwidth / t), cellheight = l * ~~(cellheight / l), xoffset = 0, yoffset = 0, cellwidth > cellheight ? (cellwidth = cellheight, xoffset = (canvas.width - cellwidth * screenwidth) / 2, yoffset = (canvas.height - cellheight * screenheight) / 2) : (cellheight = cellwidth, yoffset = (canvas.height - cellheight * screenheight) / 2, xoffset = (canvas.width - cellwidth * screenwidth) / 2), magnification = cellwidth / t * 5 | 0, levelEditorOpened && !textMode && (xoffset += cellwidth, yoffset += cellheight * (1 + editorRowCount)), cellwidth |= 0, cellheight |= 0, xoffset |= 0, yoffset |= 0, (oldcellwidth != cellwidth || oldcellheight != cellheight || oldtextmode != textMode || oldfgcolor != state.fgcolor || forceRegenImages) && (forceRegenImages = !1, regenSpriteImages()), oldcellheight = cellheight, oldcellwidth = cellwidth, oldtextmode = textMode, oldfgcolor = state.fgcolor, redraw()
        }
        var spriteimages, glyphImagesCorrespondance, glyphImages, glyphHighlight, glyphHighlightResize, glyphPrintButton, glyphMouseOver, glyphSelectedIndex = 0,
            editorRowCount = 1,
            canvasdict = {},
            canvas, ctx, x, y, cellwidth, cellheight, magnification, xoffset, yoffset;
        window.addEventListener("resize", canvasResize, !1), canvas = document.getElementById("gameCanvas"), ctx = canvas.getContext("2d"), x = 0, y = 0;
        var lastDownTarget, oldcellwidth = 0,
            oldcellheight = 0,
            oldtextmode = -1,
            oldfgcolor = -1,
            forceRegenImages = !1;
    
        function unloadGame() {
            state = introstate, level = new Level(0, 5, 5, 2, null), level.objects = new Int32Array(0), generateTitleScreen(), canvasResize(), redraw()
        }

        function generateTitleScreen() {
            if (titleMode = curlevel > 0 || null !== curlevelTarget ? 1 : 0, 0 === state.levels.length) return void(titleImage = intro_template);
            var e = "PuzzleScript Game";
            void 0 !== state.metadata.title && (e = state.metadata.title), titleImage = deepClone(0 === titleMode ? titleSelected ? titletemplate_firstgo_selected : titletemplate_firstgo : 0 === titleSelection ? titleSelected ? titletemplate_select0_selected : titletemplate_select0 : titleSelected ? titletemplate_select1_selected : titletemplate_select1);
            var t = "noaction" in state.metadata,
                a = "noundo" in state.metadata,
                l = "norestart" in state.metadata;
            a && l ? titleImage[11] = ".................................." : a ? titleImage[11] = ".R to restart....................." : l && (titleImage[11] = ".Z to undo....................."), t && (titleImage[10] = ".X to select......................");
            for (var n = 0; n < titleImage.length; n++) titleImage[n] = titleImage[n].replace(/\./g, " ");
            for (var r = titleImage[0].length, o = wordwrap(e, titleImage[0].length), n = 0; n < o.length; n++) {
                var i = o[n],
                    s = i.length,
                    c = (r - s) / 2 | 0,
                    v = titleImage[1 + n];
                titleImage[1 + n] = v.slice(0, c) + i + v.slice(c + i.length)
            }
            if (void 0 !== state.metadata.author)
                for (var u = "by " + state.metadata.author, d = wordwrap(u, titleImage[0].length), n = 0; n < d.length; n++) {
                    var m = d[n] + " ";
                    m.length > r && (m = m.slice(0, r));
                    var v = titleImage[3 + n];
                    titleImage[3 + n] = v.slice(0, r - m.length) + m
                }
        }

        function deepClone(e) {
            if (!e) return e;
            var t, a = [Number, String, Boolean];
            if (a.forEach(function(a) {
                    e instanceof a && (t = a(e))
                }), "undefined" == typeof t)
                if ("[object Array]" === Object.prototype.toString.call(e)) t = [], e.forEach(function(e, a, l) {
                    t[a] = deepClone(e)
                });
                else if ("object" == typeof e)
                if (e.nodeType && "function" == typeof e.cloneNode) var t = e.cloneNode(!0);
                else if (e.prototype) t = e;
            else if (e instanceof Date) t = new Date(e);
            else {
                t = {};
                for (var l in e) t[l] = deepClone(e[l])
            } else t = e;
            return t
        }

        function wordwrap(e, t) {
            t = t || 75;
            var a = !0;
            if (!e) return e;
            var l = ".{1," + t + "}(\\s|$)" + (a ? "|.{" + t + "}|.+$" : "|\\S+?(\\s|$)");
            return e.match(RegExp(l, "g"))
        }

        function drawMessageScreen() {
            titleMode = 0, textMode = !0, titleImage = deepClone(messagecontainer_template);
            for (var e = 0; e < titleImage.length; e++) titleImage[e] = titleImage[e].replace(/\./g, " ");
            var t = titleImage[9],
                a = titleImage[10];
            titleImage[10] = t;
            var l, n = titleImage[0].length;
            if ("" === messagetext) {
                var r = state.levels[curlevel];
                l = r.message.trim()
            } else l = messagetext;
            splitMessage = wordwrap(l, titleImage[0].length);
            var o = 5 - (splitMessage.length / 2 | 0);
            o < 0 && (o = 0);
            for (var i = Math.min(splitMessage.length, 12), e = 0; e < i; e++) {
                var s = splitMessage[e],
                    c = o + e,
                    v = s.length,
                    u = (n - v) / 2 | 0,
                    d = titleImage[c];
                titleImage[c] = d.slice(0, u) + s + d.slice(u + s.length)
            }
            var m = 10;
            i >= 10 && (m = i < 12 ? i + 1 : 12), quittingMessageScreen ? titleImage[m] = t : titleImage[m] = a, canvasResize()
        }

        function loadLevelFromLevelDat(e, t, a) {
            return null == a && (a = (Math.random() + Date.now()).toString()), loadedLevelSeed = a, RandomGen = new RNG(loadedLevelSeed), forceRegenImages = !0, titleScreen = !1, titleMode = curlevel > 0 || null !== curlevelTarget ? 1 : 0, titleSelection = curlevel > 0 || null !== curlevelTarget ? 1 : 0, titleSelected = !1, againing = !1, void 0 === t ? (consolePrint("Trying to access a level that doesn't exist.", !0), void goToTitleScreen()) : (void 0 === t.message ? (titleMode = 0, textMode = !1, level = t.clone(), RebuildLevelArrays(), void 0 !== e && (void 0 !== e.metadata.flickscreen ? oldflickscreendat = [0, 0, Math.min(e.metadata.flickscreen[0], level.width), Math.min(e.metadata.flickscreen[1], level.height)] : void 0 !== e.metadata.zoomscreen && (oldflickscreendat = [0, 0, Math.min(e.metadata.zoomscreen[0], level.width), Math.min(e.metadata.zoomscreen[1], level.height)])), backups = [], restartTarget = backupLevel(), keybuffer = [], "run_rules_on_level_start" in e.metadata && processInput(-1, !0)) : (tryPlayShowMessageSound(), drawMessageScreen(), canvasResize()), void clearInputHistory())
        }

        function loadLevelFromStateTarget(e, t, a, l) {
            var n = a;
            curlevel = t, curlevelTarget = a, void 0 === n.message && (0 === t, tryPlayStartLevelSound()), loadLevelFromLevelDat(e, e.levels[t], l), restoreLevel(a), restartTarget = a
        }

        function loadLevelFromState(e, t, a) {
            var l = e.levels[t];
            curlevel = t, curlevelTarget = null, void 0 !== l && void 0 === l.message && (0 === t, tryPlayStartLevelSound()), loadLevelFromLevelDat(e, l, a)
        }

        function tryPlaySimpleSound(e) {
            if (void 0 !== state.sfx_Events[e]) {
                var t = state.sfx_Events[e];
                playSound(t)
            }
        }

        function tryPlayTitleSound() {
            tryPlaySimpleSound("titlescreen")
        }

        function tryPlayStartGameSound() {
            tryPlaySimpleSound("startgame")
        }

        function tryPlayEndGameSound() {
            tryPlaySimpleSound("endgame")
        }

        function tryPlayCancelSound() {
            tryPlaySimpleSound("cancel")
        }

        function tryPlayStartLevelSound() {
            tryPlaySimpleSound("startlevel")
        }

        function tryPlayEndLevelSound() {
            tryPlaySimpleSound("endlevel")
        }

        function tryPlayUndoSound() {
            tryPlaySimpleSound("undo")
        }

        function tryPlayRestartSound() {
            tryPlaySimpleSound("restart")
        }

        function tryPlayShowMessageSound() {
            tryPlaySimpleSound("showmessage")
        }

        function tryPlayCloseMessageSound() {
            tryPlaySimpleSound("closemessage")
        }

        function backupLevel() {
            var e = {
                dat: new Int32Array(level.objects),
                width: level.width,
                height: level.height,
                oldflickscreendat: oldflickscreendat.concat([])
            };
            return e
        }

        function level4Serialization() {
            var e = {
                dat: Array.from(level.objects),
                width: level.width,
                height: level.height,
                oldflickscreendat: oldflickscreendat.concat([])
            };
            return e
        }

        function tryDeactivateYoutube() {
            var e = document.getElementById("youtubeFrame");
            e && document.body.removeChild(e)
        }

        function tryActivateYoutube() {
            var e = document.getElementById("youtubeFrame");
            if (!e && canYoutube && "youtube" in state.metadata) {
                var t = state.metadata.youtube,
                    a = "https://www.youtube.com/embed/" + t + "?autoplay=1&loop=1&playlist=" + t;
                ifrm = document.createElement("IFRAME"), ifrm.setAttribute("src", a), ifrm.setAttribute("id", "youtubeFrame"), ifrm.style.visibility = "hidden", ifrm.style.width = "500px", ifrm.style.height = "500px", ifrm.style.position = "absolute", ifrm.style.top = "-1000px", ifrm.style.left = "-1000px", document.body.appendChild(ifrm)
            }
        }

        function setGameState(e, t, a) {
            oldflickscreendat = [], timer = 0, autotick = 0, winning = !1, againing = !1, messageselected = !1, STRIDE_MOV = e.STRIDE_MOV, STRIDE_OBJ = e.STRIDE_OBJ, sfxCreateMask = new BitVec(STRIDE_OBJ), sfxDestroyMask = new BitVec(STRIDE_OBJ), void 0 === t && (t = ["restart"]), (0 === state.levels.length || 0 === e.levels.length) && t.length > 0 && "rebuild" === t[0] && (t = ["restart"]), void 0 === a && (a = null), RandomGen = new RNG(a), state = e, "rebuild" !== t[0] && (backups = []), sprites = [];
            for (var l in state.objects)
                if (state.objects.hasOwnProperty(l)) {
                    var n = state.objects[l],
                        r = {
                            colors: n.colors,
                            dat: n.spritematrix
                        };
                    sprites[n.id] = r
                }
            switch (void 0 !== state.metadata.realtime_interval ? (autotick = 0, autotickinterval = 1e3 * state.metadata.realtime_interval) : (autotick = 0, autotickinterval = 0), void 0 !== state.metadata.key_repeat_interval ? repeatinterval = 1e3 * state.metadata.key_repeat_interval : repeatinterval = 150, void 0 !== state.metadata.again_interval ? againinterval = 1e3 * state.metadata.again_interval : againinterval = 150, throttle_movement && 0 === autotickinterval && logWarning("throttle_movement is designed for use in conjunction with realtime_interval. Using it in other situations makes games gross and unresponsive, broadly speaking. Please don't."), norepeat_action = void 0 !== state.metadata.norepeat_action, t[0]) {
                case "restart":
                    if (1 == restarting) {
                        logWarning('A "restart" command is being triggered in the "run_rules_on_level_start" section of level creation, which would cause an infinite loop if it was actually triggered, but it\'s being ignored, so it\'s not.');
                        break
                    }
                    winning = !1, timer = 0, titleScreen = !0, tryPlayTitleSound(), textMode = !0, titleSelection = curlevel > 0 || null !== curlevelTarget ? 1 : 0, titleSelected = !1, quittingMessageScreen = !1, quittingTitleScreen = !1, messageselected = !1, titleMode = 0, (curlevel > 0 || null !== curlevelTarget) && (titleMode = 1), generateTitleScreen();
                    break;
                case "rebuild":
                    break;
                case "loadFirstNonMessageLevel":
                    for (var o = 0; o < state.levels.length; o++)
                        if (!state.levels[o].hasOwnProperty("message")) {
                            var i = o;
                            curlevel = o, winning = !1, timer = 0, titleScreen = !1, textMode = !1, titleSelection = curlevel > 0 || null !== curlevelTarget ? 1 : 0, titleSelected = !1, quittingMessageScreen = !1, quittingTitleScreen = !1, messageselected = !1, titleMode = 0, loadLevelFromState(state, i, a);
                            break
                        }
                    break;
                case "loadLevel":
                    var i = t[1];
                    curlevel = o, winning = !1, timer = 0, titleScreen = !1, textMode = !1, titleSelection = curlevel > 0 || null !== curlevelTarget ? 1 : 0, titleSelected = !1, quittingMessageScreen = !1, quittingTitleScreen = !1, messageselected = !1, titleMode = 0, loadLevelFromState(state, i, a);
                    break;
                case "levelline":
                    for (var s = t[1], o = state.levels.length - 1; o >= 0; o--) {
                        var c = state.levels[o];
                        if (c.lineNumber <= s + 1) {
                            curlevel = o, winning = !1, timer = 0, titleScreen = !1, textMode = !1, titleSelection = curlevel > 0 || null !== curlevelTarget ? 1 : 0, titleSelected = !1, quittingMessageScreen = !1, quittingTitleScreen = !1, messageselected = !1, titleMode = 0, loadLevelFromState(state, o);
                            break
                        }
                    }
            }
            "rebuild" !== t[0] && clearInputHistory(), canvasResize(), 0 == state.sounds.length && null == state.metadata.youtube ? killAudioButton() : showAudioButton()
        }

        function RebuildLevelArrays() {
            level.movements = new Int32Array(level.n_tiles * STRIDE_MOV), level.rigidMovementAppliedMask = [], level.rigidGroupIndexMask = [], level.rowCellContents = [], level.colCellContents = [], level.mapCellContents = new BitVec(STRIDE_OBJ), _movementVecs = [new BitVec(STRIDE_MOV), new BitVec(STRIDE_MOV), new BitVec(STRIDE_MOV)], _o1 = new BitVec(STRIDE_OBJ), _o2 = new BitVec(STRIDE_OBJ), _o2_5 = new BitVec(STRIDE_OBJ), _o3 = new BitVec(STRIDE_OBJ), _o4 = new BitVec(STRIDE_OBJ), _o5 = new BitVec(STRIDE_OBJ), _o6 = new BitVec(STRIDE_OBJ), _o7 = new BitVec(STRIDE_OBJ), _o8 = new BitVec(STRIDE_OBJ), _o9 = new BitVec(STRIDE_OBJ), _o10 = new BitVec(STRIDE_OBJ), _o11 = new BitVec(STRIDE_OBJ), _o12 = new BitVec(STRIDE_OBJ), _m1 = new BitVec(STRIDE_MOV), _m2 = new BitVec(STRIDE_MOV), _m3 = new BitVec(STRIDE_MOV);
            for (var e = 0; e < level.height; e++) level.rowCellContents[e] = new BitVec(STRIDE_OBJ);
            for (var e = 0; e < level.width; e++) level.colCellContents[e] = new BitVec(STRIDE_OBJ);
            for (var e = 0; e < level.n_tiles; e++) level.rigidMovementAppliedMask[e] = new BitVec(STRIDE_MOV), level.rigidGroupIndexMask[e] = new BitVec(STRIDE_MOV)
        }

        function restoreLevel(e) {
            if (oldflickscreendat = e.oldflickscreendat.concat([]), level.objects = new Int32Array(e.dat), level.width !== e.width || level.height !== e.height) level.width = e.width, level.height = e.height, level.n_tiles = e.width * e.height, RebuildLevelArrays();
            else {
                for (var t = 0; t < level.n_tiles; t++) level.movements[t] = 0, level.rigidMovementAppliedMask[t] = 0, level.rigidGroupIndexMask[t] = 0;
                for (var t = 0; t < level.height; t++) {
                    var a = level.rowCellContents[t];
                    a.setZero()
                }
                for (var t = 0; t < level.width; t++) {
                    var l = level.colCellContents[t];
                    l.setZero()
                }
            }
            againing = !1, level.commandQueue = [], level.commandQueueSourceRules = []
        }

        function DoRestart(e) {
            restarting !== !0 && (restarting = !0, e !== !0 && "norestart" in state.metadata || (e === !1 && backups.push(backupLevel()), verbose_logging && consolePrint("--- restarting ---", !0), restoreLevel(restartTarget), tryPlayRestartSound(), "run_rules_on_level_start" in state.metadata && processInput(-1, !0), level.commandQueue = [], level.commandQueueSourceRules = [], restarting = !1))
        }

        function backupDiffers() {
            if (0 == backups.length) return !0;
            for (var e = backups[backups.length - 1], t = 0; t < level.objects.length; t++)
                if (level.objects[t] !== e.dat[t]) return !0;
            return !1
        }

        function DoUndo(e, t) {
            if (levelEditorOpened || !("noundo" in state.metadata) || e === !0) {
                if (verbose_logging && consolePrint("--- undoing ---", !0), t)
                    for (; 0 == backupDiffers();) backups.pop();
                if (backups.length > 0) {
                    var a = backups[backups.length - 1];
                    restoreLevel(a), backups = backups.splice(0, backups.length - 1), e || tryPlayUndoSound()
                }
            }
        }

        function getPlayerPositions() {
            var e = [],
                t = state.playerMask;
            for (i = 0; i < level.n_tiles; i++) level.getCellInto(i, _o11), t.anyBitsInCommon(_o11) && e.push(i);
            return e
        }

        function getLayersOfMask(e) {
            for (var t = [], a = 0; a < state.objectCount; a++)
                if (e.get(a)) {
                    var l = state.idDict[a],
                        n = state.objects[l];
                    t.push(n.layer)
                }
            return t
        }

        function moveEntitiesAtIndex(e, t, a) {
            var l = level.getCell(e);
            l.iand(t);
            for (var n = getLayersOfMask(l), r = level.getMovements(e), o = 0; o < n.length; o++) r.ishiftor(a, 5 * n[o]);
            level.setMovements(e, r)
        }

        function startMovement(e) {
            for (var t = getPlayerPositions(), a = 0; a < t.length; a++) {
                var l = t[a];
                moveEntitiesAtIndex(l, state.playerMask, e)
            }
            return t
        }

        function repositionEntitiesOnLayer(e, t, a) {
            var l = dirMasksDelta[a],
                n = l[0],
                r = l[1],
                o = e / level.height | 0,
                i = e % level.height,
                s = level.width - 1,
                c = level.height - 1;
            if (0 === o && n < 0 || o === s && n > 0 || 0 === i && r < 0 || i === c && r > 0) return !1;
            var v = e + l[1] + l[0] * level.height,
                u = state.layerMasks[t],
                d = level.getCellInto(v, _o7),
                m = level.getCellInto(e, _o8);
            if (u.anyBitsInCommon(d) && 16 != a) return !1;
            for (var g = 0; g < state.sfx_MovementMasks.length; g++) {
                var h = state.sfx_MovementMasks[g],
                    f = h.objectMask;
                if (f.anyBitsInCommon(m)) {
                    var p = level.getMovements(e),
                        y = h.directionMask;
                    p.anyBitsInCommon(y) && seedsToPlay_CanMove.indexOf(h.seed) === -1 && seedsToPlay_CanMove.push(h.seed)
                }
            }
            var S = m.clone();
            m.iclear(u), S.iand(u), d.ior(S), level.setCell(e, m), level.setCell(v, d);
            var _ = v / level.height | 0,
                M = v % level.height;
            return level.colCellContents[_].ior(S), level.rowCellContents[M].ior(S), level.mapCellContents.ior(S), !0
        }

        function repositionEntitiesAtCell(e) {
            var t = level.getMovements(e);
            if (t.iszero()) return !1;
            for (var a = !1, l = 0; l < level.layerCount; l++) {
                var n = t.getshiftor(31, 5 * l);
                if (0 !== n) {
                    var r = repositionEntitiesOnLayer(e, l, n);
                    r && (t.ishiftclear(n, 5 * l), a = !0)
                }
            }
            return level.setMovements(e, t), a
        }

        function Level(e, t, a, l, n) {
            this.lineNumber = e, this.width = t, this.height = a, this.n_tiles = t * a, this.objects = n, this.layerCount = l, this.commandQueue = [], this.commandQueueSourceRules = []
        }

        function BitVec(e) {
            return this.data = new Int32Array(e), this
        }

        function Rule(e) {
            this.direction = e[0], this.patterns = e[1], this.hasReplacements = e[2], this.lineNumber = e[3], this.isEllipsis = e[4], this.groupNumber = e[5], this.isRigid = e[6], this.commands = e[7], this.isRandom = e[8], this.cellRowMasks = e[9], this.cellRowMatches = [];
            for (var t = 0; t < this.patterns.length; t++) this.cellRowMatches.push(this.generateCellRowMatchesFunction(this.patterns[t], this.isEllipsis[t]))
        }

        function CellPattern(e) {
            this.objectsPresent = e[0], this.objectsMissing = e[1], this.anyObjectsPresent = e[2], this.movementsPresent = e[3], this.movementsMissing = e[4], this.matches = this.generateMatchFunction(), this.replacement = e[5]
        }

        function CellReplacement(e) {
            this.objectsClear = e[0], this.objectsSet = e[1], this.movementsClear = e[2], this.movementsSet = e[3], this.movementsLayerMask = e[4], this.randomEntityMask = e[5], this.randomDirMask = e[6]
        }

        function DoesCellRowMatchWildCard(e, t, a, l, n) {
            void 0 === n && (n = 0);
            var r = t[0];
            if (r.matches(a, level))
                for (var o = dirMasksDelta[e], i = o[0] * level.height, s = o[1], c = a, v = 1; v < t.length; v += 1) {
                    c = c + s + i;
                    var r = t[v];
                    if (r === ellipsisPattern) {
                        for (var u = n; u < l; u++) {
                            var d = c;
                            d = (d + (s + i) * u + level.n_tiles) % level.n_tiles;
                            for (var m = v + 1; m < t.length && (r = t[m], r.matches(d, level)); m++) d = d + s + i;
                            if (m >= t.length) return !0
                        }
                        break
                    }
                    if (!r.matches(c, level)) break
                }
            return !1
        }

        function DoesCellRowMatch(e, t, a, l) {
            var n = t[0];
            if (n.matches(a, level)) {
                for (var r = dirMasksDelta[e], o = r[0] * level.height, i = r[1], s = t.length, c = a, v = 1; v < s && (c = c + i + o, n = t[v], n === ellipsisPattern && (c += (i + o) * l), n.matches(c, level)); v++);
                if (v >= t.length) return !0
            }
            return !1
        }

        function matchCellRow(e, t, a, l) {
            var n = [];
            if (!l.bitsSetInArray(level.mapCellContents.data)) return n;
            var r = 0,
                o = level.width,
                i = 0,
                s = level.height,
                c = a.length;
            switch (e) {
                case 1:
                    i += c - 1;
                    break;
                case 2:
                    s -= c - 1;
                    break;
                case 4:
                    r += c - 1;
                    break;
                case 8:
                    o -= c - 1;
                    break;
                default:
                    window.console.log("EEEP " + e)
            }
            var v = e > 2;
            if (v) {
                for (var u = i; u < s; u++)
                    if (l.bitsSetInArray(level.rowCellContents[u].data))
                        for (var d = r; d < o; d++) {
                            var m = d * level.height + u;
                            t(a, m, level) && n.push(m)
                        }
            } else
                for (var d = r; d < o; d++)
                    if (l.bitsSetInArray(level.colCellContents[d].data))
                        for (var u = i; u < s; u++) {
                            var m = d * level.height + u;
                            t(a, m, level) && n.push(m)
                        }
                    return n
        }

        function matchCellRowWildCard(e, t, a, l) {
            var n = [];
            if (!l.bitsSetInArray(level.mapCellContents.data)) return n;
            var r = 0,
                o = level.width,
                i = 0,
                s = level.height,
                c = a.length - 1;
            switch (e) {
                case 1:
                    i += c - 1;
                    break;
                case 2:
                    s -= c - 1;
                    break;
                case 4:
                    r += c - 1;
                    break;
                case 8:
                    o -= c - 1;
                    break;
                default:
                    window.console.log("EEEP2 " + e)
            }
            var v = e > 2;
            if (v) {
                for (var u = i; u < s; u++)
                    if (l.bitsSetInArray(level.rowCellContents[u].data))
                        for (var d = r; d < o; d++) {
                            var m, g = d * level.height + u;
                            4 === e ? m = d - c + 2 : 8 === e ? m = level.width - (d + c) + 1 : window.console.log("EEEP2 " + e), n.push.apply(n, t(a, g, m, 0, level))
                        }
            } else
                for (var d = r; d < o; d++)
                    if (l.bitsSetInArray(level.colCellContents[d].data))
                        for (var u = i; u < s; u++) {
                            var m, g = d * level.height + u;
                            2 === e ? m = level.height - (u + c) + 1 : 1 === e ? m = u - c + 2 : window.console.log("EEEP2 " + e), n.push.apply(n, t(a, g, m, 0, level))
                        }
                    return n
        }

        function generateTuples(e) {
            for (var t = [
                    []
                ], a = 0; a < e.length; a++) {
                for (var l = e[a], n = [], r = 0; r < l.length; r++)
                    for (var o = l[r], i = 0; i < t.length; i++) {
                        var s = t[i],
                            c = s.concat([o]);
                        n.push(c)
                    }
                t = n
            }
            return t
        }

        function commitPreservationState(e) {
            var t = {
                ruleGroupIndex: e,
                objects: new Int32Array(level.objects),
                movements: new Int32Array(level.movements),
                rigidGroupIndexMask: level.rigidGroupIndexMask.concat([]),
                rigidMovementAppliedMask: level.rigidMovementAppliedMask.concat([]),
                bannedGroup: level.bannedGroup.concat([]),
                commandQueue: level.commandQueue.concat([]),
                commandQueueSourceRules: level.commandQueueSourceRules.concat([])
            };
            return rigidBackups[e] = t, t
        }

        function restorePreservationState(e) {
            level.objects = new Int32Array(e.objects), level.movements = new Int32Array(e.movements), level.rigidGroupIndexMask = e.rigidGroupIndexMask.concat([]), level.rigidMovementAppliedMask = e.rigidMovementAppliedMask.concat([]), level.commandQueue = e.commandQueue.concat([]), level.commandQueueSourceRules = e.commandQueueSourceRules.concat([]), sfxCreateMask.setZero(), sfxDestroyMask.setZero(), consolePrint("Rigid movement application failed, rolling back")
        }

        function showTempMessage() {
            keybuffer = [], textMode = !0, titleScreen = !1, quittingMessageScreen = !1, messageselected = !1, tryPlayShowMessageSound(), drawMessageScreen(), canvasResize()
        }

        function applyRandomRuleGroup(e) {
            for (var t = [], a = 0; a < e.length; a++) {
                var l = e[a],
                    n = l.findMatches();
                if (n.length > 0)
                    for (var r = generateTuples(n), o = 0; o < r.length; o++) {
                        var i = r[o];
                        t.push([a, i])
                    }
            }
            if (0 === t.length) return !1;
            var s = t[Math.floor(RandomGen.uniform() * t.length)],
                a = s[0],
                l = e[a],
                c = dirMasksDelta[l.direction],
                i = s[1],
                v = !1,
                u = l.applyAt(c, i, v);
            return l.queueCommands(), u
        }

        function applyRuleGroup(e) {
            if (e[0].isRandom) return applyRandomRuleGroup(e);
            for (var t = !1, a = !0, l = 0; a;) {
                if (l++, l > 200) {
                    logErrorCacheable("Got caught looping lots in a rule group :O", e[0].lineNumber, !0);
                    break
                }
                a = !1;
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    a = r.tryApply() || a
                }
                a && (t = !0)
            }
            return t
        }

        function applyRules(e, t, a, l) {
            for (var n = a > 0, r = 0, o = a; o < e.length;) {
                if (l && l[o]);
                else {
                    var i = e[o];
                    n = applyRuleGroup(i) || n
                }
                if (n && void 0 !== t[o]) {
                    if (o = t[o], n = !1, r++, r > 200) {
                        var i = e[o];
                        logErrorCacheable("got caught in an endless startloop...endloop vortex, escaping!", i[0].lineNumber, !0);
                        break
                    }
                } else if (o++, o === e.length && n && void 0 !== t[o] && (o = t[o], n = !1, r++, r > 200)) {
                    var i = e[o];
                    logErrorCacheable("got caught in an endless startloop...endloop vortex, escaping!", i[0].lineNumber, !0);
                    break
                }
            }
        }

        function resolveMovements(e) {
            for (var t = !0; t;) {
                t = !1;
                for (var a = 0; a < level.n_tiles; a++) t = repositionEntitiesAtCell(a) || t
            }
            for (var l = !1, a = 0; a < level.n_tiles; a++) {
                var n = level.getCellInto(a, _o6),
                    r = level.getMovements(a);
                if (!r.iszero()) {
                    var o = level.rigidMovementAppliedMask[a];
                    if (0 !== o && (r.iand(o), !r.iszero()))
                        for (var i = 0; i < level.layerCount; i++) {
                            var s = r.getshiftor(31, 5 * i);
                            if (0 !== s) {
                                var c = level.rigidGroupIndexMask[a],
                                    v = c.getshiftor(31, 5 * i);
                                v--;
                                var u = state.rigidGroupIndex_to_GroupIndex[v];
                                level.bannedGroup[u] = !0, l = !0;
                                break
                            }
                        }
                    for (var i = 0; i < state.sfx_MovementFailureMasks.length; i++) {
                        var d = state.sfx_MovementFailureMasks[i],
                            m = d.objectMask;
                        if (m.anyBitsInCommon(n)) {
                            var g = d.directionMask;
                            r.anyBitsInCommon(g) && seedsToPlay_CantMove.indexOf(d.seed) === -1 && seedsToPlay_CantMove.push(d.seed)
                        }
                    }
                }
                for (var i = 0; i < STRIDE_MOV; i++) level.movements[i + a * STRIDE_MOV] = 0;
                level.rigidGroupIndexMask[a] = 0, level.rigidMovementAppliedMask[a] = 0
            }
            return l
        }

        function calculateRowColMasks() {
            for (var e = 0; e < level.mapCellContents.length; e++) level.mapCellContents[e] = 0;
            for (var e = 0; e < level.width; e++) {
                var t = level.colCellContents[e];
                t.setZero()
            }
            for (var e = 0; e < level.height; e++) {
                var a = level.rowCellContents[e];
                a.setZero()
            }
            for (var e = 0; e < level.width; e++)
                for (var l = 0; l < level.height; l++) {
                    var n = l + e * level.height,
                        r = level.getCellInto(n, _o9);
                    level.mapCellContents.ior(r), level.rowCellContents[l].ior(r), level.colCellContents[e].ior(r)
                }
        }

        function processInput(e, t, a) {
            againing = !1, verbose_logging && (e === -1 ? consolePrint("Turn starts with no input.") : (consolePrint("======================="), consolePrint("Turn starts with input of " + ["up", "left", "down", "right", "action"][e] + ".")));
            var l = backupLevel(),
                n = [];
            if (e <= 4) {
                if (e >= 0) {
                    switch (e) {
                        case 0:
                            e = parseInt("00001", 2);
                            break;
                        case 1:
                            e = parseInt("00100", 2);
                            break;
                        case 2:
                            e = parseInt("00010", 2);
                            break;
                        case 3:
                            e = parseInt("01000", 2);
                            break;
                        case 4:
                            e = parseInt("10000", 2)
                    }
                    n = startMovement(e)
                }
                var r = 0;
                level.bannedGroup = [], rigidBackups = [], level.commandQueue = [], level.commandQueueSourceRules = [];
                var o = 0,
                    i = !1,
                    s = commitPreservationState();
                sfxCreateMask.setZero(), sfxDestroyMask.setZero(), seedsToPlay_CanMove = [], seedsToPlay_CantMove = [], calculateRowColMasks();
                do {
                    i = !1, r++, verbose_logging && consolePrint("applying rules"), applyRules(state.rules, state.loopPoint, o, level.bannedGroup);
                    var c = resolveMovements();
                    c ? (i = !0, restorePreservationState(s), o = 0) : (verbose_logging && consolePrint("applying late rules"), applyRules(state.lateRules, state.lateLoopPoint, 0), o = 0)
                } while (r < 50 && i);
                if (r >= 50 && consolePrint("looped through 50 times, gave up. too many loops!"), n.length > 0 && void 0 !== state.metadata.require_player_movement) {
                    for (var v = !1, r = 0; r < n.length; r++) {
                        var u = n[r],
                            d = level.getCell(u);
                        if (state.playerMask.bitsClearInArray(d.data)) {
                            v = !0;
                            break
                        }
                    }
                    if (v === !1) return verbose_logging && (consolePrint("require_player_movement set, but no player movement detected, so cancelling turn."), consoleCacheDump()), backups.push(l), DoUndo(!0, !1), !1
                }
                if (level.commandQueue.indexOf("cancel") >= 0) {
                    if (verbose_logging) {
                        consoleCacheDump();
                        var m = level.commandQueueSourceRules[level.commandQueue.indexOf("cancel")];
                        consolePrintFromRule("CANCEL command executed, cancelling turn.", m, !0)
                    }
                    return backups.push(l), messagetext = "", DoUndo(!0, !1), tryPlayCancelSound(), !1
                }
                if (level.commandQueue.indexOf("restart") >= 0) {
                    if (verbose_logging) {
                        var m = level.commandQueueSourceRules[level.commandQueue.indexOf("restart")];
                        consolePrintFromRule("RESTART command executed, reverting to restart state.", m), consoleCacheDump()
                    }
                    return backups.push(l), messagetext = "", DoRestart(!0), !0
                }
                if (a && level.commandQueue.indexOf("win") >= 0) return !0;
                for (var g = !1, r = 0; r < level.objects.length; r++)
                    if (level.objects[r] !== l.dat[r]) {
                        if (a) return verbose_logging && consoleCacheDump(), backups.push(l), DoUndo(!0, !1), !0;
                        e !== -1 && backups.push(l), g = !0;
                        break
                    }
                if (a) return verbose_logging && consoleCacheDump(), !1;
                for (var r = 0; r < seedsToPlay_CantMove.length; r++) playSound(seedsToPlay_CantMove[r]);
                for (var r = 0; r < seedsToPlay_CanMove.length; r++) playSound(seedsToPlay_CanMove[r]);
                for (var r = 0; r < state.sfx_CreationMasks.length; r++) {
                    var h = state.sfx_CreationMasks[r];
                    sfxCreateMask.anyBitsInCommon(h.objectMask) && playSound(h.seed)
                }
                for (var r = 0; r < state.sfx_DestructionMasks.length; r++) {
                    var h = state.sfx_DestructionMasks[r];
                    sfxDestroyMask.anyBitsInCommon(h.objectMask) && playSound(h.seed)
                }
                for (var r = 0; r < level.commandQueue.length; r++) {
                    var f = level.commandQueue[r];
                    "f" === f.charAt(1) && tryPlaySimpleSound(f), unitTesting === !1 ? "message" === f && showTempMessage() : messagetext = ""
                }
                if (textMode === !1 && (verbose_logging && consolePrint("Checking win condition."), void 0 === t && (t = !1), checkWin(t)), !winning) {
                    if (level.commandQueue.indexOf("checkpoint") >= 0) {
                        if (verbose_logging) {
                            var m = level.commandQueueSourceRules[level.commandQueue.indexOf("checkpoint")];
                            consolePrintFromRule("CHECKPOINT command executed, saving current state to the restart state.", m)
                        }
                        restartTarget = level4Serialization(), hasUsedCheckpoint = !0;
                        var p = JSON.stringify(restartTarget);
                        localStorage[document.URL + "_checkpoint"] = p, localStorage[document.URL] = curlevel
                    }
                    if (level.commandQueue.indexOf("again") >= 0 && g) {
                        var m = level.commandQueueSourceRules[level.commandQueue.indexOf("again")],
                            y = verbose_logging,
                            S = messagetext;
                        verbose_logging = !1, processInput(-1, !0, !0) ? (verbose_logging = y, verbose_logging && consolePrintFromRule("AGAIN command executed, with changes detected - will execute another turn.", m), againing = !0, timer = 0) : (verbose_logging = y, verbose_logging && consolePrintFromRule("AGAIN command not executed, it wouldn't make any changes.", m)), verbose_logging = y, messagetext = S
                    }
                }
                level.commandQueue = [], level.commandQueueSourceRules = []
            }
            return verbose_logging && consoleCacheDump(), winning && (againing = !1), g
        }

        function checkWin(e) {
            if (levelEditorOpened && (e = !0), level.commandQueue.indexOf("win") >= 0) return consolePrint("Win Condition Satisfied"), void(e || DoWin());
            var t = !1;
            if (state.winconditions.length > 0) {
                for (var a = !0, l = 0; l < state.winconditions.length; l++) {
                    var n = state.winconditions[l],
                        r = n[1],
                        o = n[2],
                        i = !0;
                    switch (n[0]) {
                        case -1:
                            for (var s = 0; s < level.n_tiles; s++) {
                                var c = level.getCellInto(s, _o10);
                                if (!r.bitsClearInArray(c.data) && !o.bitsClearInArray(c.data)) {
                                    i = !1;
                                    break
                                }
                            }
                            break;
                        case 0:
                            for (var v = !1, s = 0; s < level.n_tiles; s++) {
                                var c = level.getCellInto(s, _o10);
                                if (!r.bitsClearInArray(c.data) && !o.bitsClearInArray(c.data)) {
                                    v = !0;
                                    break
                                }
                            }
                            v === !1 && (i = !1);
                            break;
                        case 1:
                            for (var s = 0; s < level.n_tiles; s++) {
                                var c = level.getCellInto(s, _o10);
                                if (!r.bitsClearInArray(c.data) && o.bitsClearInArray(c.data)) {
                                    i = !1;
                                    break
                                }
                            }
                    }
                    i === !1 && (a = !1)
                }
                t = a
            }
            t && (consolePrint("Win Condition Satisfied"), e || DoWin())
        }

        function DoWin() {
            if (!winning) {
                if (againing = !1, tryPlayEndLevelSound(), unitTesting) return void nextLevel();
                winning = !0, timer = 0
            }
        }

        function nextLevel() {
            if (againing = !1, messagetext = "", state && state.levels && curlevel > state.levels.length && (curlevel = state.levels.length - 1), titleScreen) {
                0 === titleSelection && (curlevel = 0, curlevelTarget = null), null !== curlevelTarget ? loadLevelFromStateTarget(state, curlevel, curlevelTarget) : loadLevelFromState(state, curlevel);
            }
            else if (hasUsedCheckpoint && (curlevelTarget = null, hasUsedCheckpoint = !1), curlevel < state.levels.length - 1) curlevel++, textMode = !1, titleScreen = !1, quittingMessageScreen = !1, messageselected = !1, null !== curlevelTarget ? loadLevelFromStateTarget(state, curlevel, curlevelTarget) : loadLevelFromState(state, curlevel);
            else {
                try {
                    window.localStorage && (localStorage.removeItem(document.URL), localStorage.removeItem(document.URL + "_checkpoint"))
                } catch (e) {}
                //curlevel = 0, curlevelTarget = null, goToTitleScreen(), tryPlayEndGameSound()
                finishPuzzlePage();
            }
            try {
                if (window.localStorage)
                    if (localStorage[document.URL] = curlevel, null !== curlevelTarget) {
                        restartTarget = level4Serialization();
                        var e = JSON.stringify(restartTarget);
                        localStorage[document.URL + "_checkpoint"] = e
                    } else localStorage.removeItem(document.URL + "_checkpoint")
            } catch (e) {}
            void 0 !== state && void 0 !== state.metadata.flickscreen && (oldflickscreendat = [0, 0, Math.min(state.metadata.flickscreen[0], level.width), Math.min(state.metadata.flickscreen[1], level.height)]), canvasResize(), clearInputHistory()
        }

        function goToTitleScreen() {
            againing = !1, messagetext = "", titleScreen = !0, textMode = !0, titleSelection = curlevel > 0 || null !== curlevelTarget ? 1 : 0, generateTitleScreen()
        }
        var RandomGen = new RNG,
            intro_template = ["..................................", "..................................", "..................................", "......Puzzle Script Terminal......", "..............v 1.6...............", "..................................", "..................................", "..................................", ".........insert cartridge.........", "..................................", "..................................", "..................................", ".................................."],
            messagecontainer_template = ["..................................", "..................................", "..................................", "..................................", "..................................", "..................................", "..................................", "..................................", "..................................", "..................................", "..........X to continue...........", "..................................", ".................................."],
            titletemplate_firstgo = ["..................................", "..................................", "..................................", "..................................", "..................................", "..................................", "..........#.start game.#..........", "..................................", "..................................", ".arrow keys to move...............", ".Z to undo........................", ".R to restart.....................", ".................................."],
            titletemplate_select0 = ["..................................", "..................................", "..................................", "..................................", "..................................", "...........#.new game.#...........", "..................................", ".............continue.............", "..................................", ".arrow keys to move...............", ".Z to undo........................", ".R to restart.....................", ".................................."],
            titletemplate_select1 = ["..................................", "..................................", "..................................", "..................................", "..................................", ".............new game.............", "..................................", "...........#.continue.#...........", "..................................", ".arrow keys to move...............", ".Z to undo........................", ".R to restart.....................", ".................................."],
            titletemplate_firstgo_selected = ["..................................", "..................................", "..................................", "..................................", "..................................", "..................................", "###########.start game.###########", "..................................", "..................................", ".arrow keys to move...............", ".Z to undo........................", ".R to restart.....................", ".................................."],
            titletemplate_select0_selected = ["..................................", "..................................", "..................................", "..................................", "..................................", "############.new game.############", "..................................", ".............continue.............", "..................................", ".arrow keys to move...............", ".Z to undo........................", ".R to restart.....................", ".................................."],
            titletemplate_select1_selected = ["..................................", "..................................", "..................................", "..................................", "..................................", ".............new game.............", "..................................", "############.continue.############", "..................................", ".arrow keys to move...............", ".Z to undo........................", ".R to restart.....................", ".................................."],
            titleImage = [],
            titleWidth = titletemplate_select1[0].length,
            titleHeight = titletemplate_select1.length,
            textMode = !0,
            titleScreen = !0,
            titleMode = 0,
            titleSelection = 0,
            titleSelected = !1,
            introstate = {
                title: "EMPTY GAME",
                attribution: "increpare",
                objectCount: 2,
                metadata: [],
                levels: [],
                bgcolor: "#000000",
                fgcolor: "#FFFFFF"
            },
            state = introstate,
            splitMessage = [],
            loadedLevelSeed = 0,
            sprites = [{
                color: "#423563",
                dat: [
                    [1, 1, 1, 1, 1],
                    [1, 0, 0, 0, 1],
                    [1, 0, 0, 0, 1],
                    [1, 0, 0, 0, 1],
                    [1, 1, 1, 1, 1]
                ]
            }, {
                color: "#252342",
                dat: [
                    [0, 0, 1, 0, 0],
                    [1, 1, 1, 1, 1],
                    [0, 0, 1, 0, 0],
                    [0, 1, 1, 1, 0],
                    [0, 1, 0, 1, 0]
                ]
            }];
        generateTitleScreen(), titleMode > 0 && (titleSelection = 1), canvasResize();
        var backups = [],
            restartTarget, messagetext = "",
            zoomscreen = !1,
            flickscreen = !1,
            screenwidth = 0,
            screenheight = 0,
            dirMasksDelta = {
                1: [0, -1],
                2: [0, 1],
                4: [-1, 0],
                8: [1, 0],
                15: [0, 0],
                16: [0, 0],
                3: [0, 0]
            },
            dirMaskName = {
                1: "up",
                2: "down",
                4: "left",
                8: "right",
                15: "?",
                16: "action",
                3: "no"
            },
            seedsToPlay_CanMove = [],
            seedsToPlay_CantMove = [];
        Level.prototype.clone = function() {
            var e = new Level(this.lineNumber, this.width, this.height, this.layerCount, null);
            return e.objects = new Int32Array(this.objects), e
        }, Level.prototype.getCell = function(e) {
            return new BitVec(this.objects.subarray(e * STRIDE_OBJ, e * STRIDE_OBJ + STRIDE_OBJ))
        }, Level.prototype.getCellInto = function(e, t) {
            for (var a = 0; a < STRIDE_OBJ; a++) t.data[a] = this.objects[e * STRIDE_OBJ + a];
            return t
        }, Level.prototype.setCell = function(e, t) {
            for (var a = 0; a < t.data.length; ++a) this.objects[e * STRIDE_OBJ + a] = t.data[a];
        };
        var _movementVecs, _movementVecIndex = 0;
        Level.prototype.getMovements = function(e) {
            var t = _movementVecs[_movementVecIndex];
            _movementVecIndex = (_movementVecIndex + 1) % _movementVecs.length;
            for (var a = 0; a < STRIDE_MOV; a++) t.data[a] = this.movements[e * STRIDE_MOV + a];
            return t
        }, Level.prototype.setMovements = function(e, t) {
            for (var a = 0; a < t.data.length; ++a) this.movements[e * STRIDE_MOV + a] = t.data[a]
        };
        var ellipsisPattern = ["ellipsis"];
        BitVec.prototype.cloneInto = function(e) {
            for (var t = 0; t < this.data.length; ++t) e.data[t] = this.data[t];
            return e
        }, BitVec.prototype.clone = function() {
            return new BitVec(this.data)
        }, BitVec.prototype.iand = function(e) {
            for (var t = 0; t < this.data.length; ++t) this.data[t] &= e.data[t]
        }, BitVec.prototype.ior = function(e) {
            for (var t = 0; t < this.data.length; ++t) this.data[t] |= e.data[t]
        }, BitVec.prototype.iclear = function(e) {
            for (var t = 0; t < this.data.length; ++t) this.data[t] &= ~e.data[t]
        }, BitVec.prototype.ibitset = function(e) {
            this.data[e >> 5] |= 1 << (31 & e)
        }, BitVec.prototype.ibitclear = function(e) {
            this.data[e >> 5] &= ~(1 << (31 & e))
        }, BitVec.prototype.get = function(e) {
            return 0 !== (this.data[e >> 5] & 1 << (31 & e))
        }, BitVec.prototype.getshiftor = function(e, t) {
            var a = 31 & t,
                l = this.data[t >> 5] >>> a;
            return a && (l |= this.data[(t >> 5) + 1] << 32 - a), l & e
        }, BitVec.prototype.ishiftor = function(e, t) {
            var a = 31 & t,
                l = e << a;
            if (this.data[t >> 5] |= l, a) {
                var n = e >> 32 - a;
                this.data[(t >> 5) + 1] |= n
            }
        }, BitVec.prototype.ishiftclear = function(e, t) {
            var a = 31 & t,
                l = e << a;
            if (this.data[t >> 5] &= ~l, a) {
                var n = e >> 32 - (31 & t);
                this.data[(t >> 5) + 1] &= ~n
            }
        }, BitVec.prototype.equals = function(e) {
            if (this.data.length !== e.data.length) return !1;
            for (var t = 0; t < this.data.length; ++t)
                if (this.data[t] !== e.data[t]) return !1;
            return !0
        }, BitVec.prototype.setZero = function() {
            for (var e = 0; e < this.data.length; ++e) this.data[e] = 0
        }, BitVec.prototype.iszero = function() {
            for (var e = 0; e < this.data.length; ++e)
                if (this.data[e]) return !1;
            return !0
        }, BitVec.prototype.bitsSetInArray = function(e) {
            for (var t = 0; t < this.data.length; ++t)
                if ((this.data[t] & e[t]) !== this.data[t]) return !1;
            return !0
        }, BitVec.prototype.bitsClearInArray = function(e) {
            for (var t = 0; t < this.data.length; ++t)
                if (this.data[t] & e[t]) return !1;
            return !0
        }, BitVec.prototype.anyBitsInCommon = function(e) {
            return !this.bitsClearInArray(e.data)
        }, Rule.prototype.generateCellRowMatchesFunction = function(e, t) {
            if (0 == t) {
                for (var a = dirMasksDelta[this.direction], l = a[0], n = a[1], r = e.length, o = "var d = " + n + "+" + l + "*level.height;\n", i = 1 === STRIDE_OBJ ? "" : "*" + STRIDE_OBJ, s = 0; s < STRIDE_OBJ; ++s) o += "var cellObjects" + s + " = level.objects[i" + i + (s ? "+" + s : "") + "];\n";
                i = 1 === STRIDE_MOV ? "" : "*" + STRIDE_MOV;
                for (var s = 0; s < STRIDE_MOV; ++s) o += "var cellMovements" + s + " = level.movements[i" + i + (s ? "+" + s : "") + "];\n";
                o += "return " + e[0].generateMatchString("0_");
                for (var c = 1; c < r; c++) o += "&&cellRow[" + c + "].matches((i+" + c + "*d), level)";
                return o += ";", o in matchCache ? matchCache[o] : matchCache[o] = new Function("cellRow", "i", "level", o)
            }
            var a = dirMasksDelta[this.direction],
                l = a[0],
                n = a[1],
                r = e.length,
                o = "var d = " + n + "+" + l + "*level.height;\n";
            o += "var result = [];\n", o += "if(cellRow[0].matches(i, level)";
            for (var c = 1; e[c] !== ellipsisPattern; c++) o += "&&cellRow[" + c + "].matches((i+" + c + "*d), level)";
            for (c++, o += ") {\n", o += "\tfor (var k=kmin;k<kmax;k++) {\n", o += "\t\tif(cellRow[" + c + "].matches((i+d*(k+" + (c - 1) + ")), level)", c++; c < r; c++) o += "&&cellRow[" + c + "].matches((i+d*(k+" + (c - 1) + ")), level)";
            return o += "){\n", o += "\t\t\tresult.push([i,k]);\n", o += "\t\t}\n", o += "\t}\n", o += "}\n", o += "return result;", o in matchCache ? matchCache[o] : matchCache[o] = new Function("cellRow", "i", "kmax", "kmin", "level", o)
        }, Rule.prototype.toJSON = function() {
            return [this.direction, this.patterns, this.hasReplacements, this.lineNumber, this.isEllipsis, this.groupNumber, this.isRigid, this.commands, this.isRandom, this.cellRowMasks]
        };
        var STRIDE_OBJ = 1,
            STRIDE_MOV = 1,
            matchCache = {};
        CellPattern.prototype.generateMatchString = function() {
            for (var e = "(true", t = 0; t < Math.max(STRIDE_OBJ, STRIDE_MOV); ++t) {
                var a = "cellObjects" + t,
                    l = "cellMovements" + t,
                    n = this.objectsPresent.data[t],
                    r = this.objectsMissing.data[t],
                    o = this.movementsPresent.data[t],
                    i = this.movementsMissing.data[t];
                n && (e += n & n - 1 ? "\t\t&& ((" + a + "&" + n + ")===" + n + ")\n" : "\t\t&& (" + a + "&" + n + ")\n"), r && (e += "\t\t&& !(" + a + "&" + r + ")\n"), o && (e += o & o - 1 ? "\t\t&& ((" + l + "&" + o + ")===" + o + ")\n" : "\t\t&& (" + l + "&" + o + ")\n"), i && (e += "\t\t&& !(" + l + "&" + i + ")\n")
            }
            for (var s = 0; s < this.anyObjectsPresent.length; s++) {
                e += "\t\t&& (0";
                for (var t = 0; t < STRIDE_OBJ; ++t) {
                    var c = this.anyObjectsPresent[s].data[t];
                    c && (e += "|(cellObjects" + t + "&" + c + ")")
                }
                e += ")"
            }
            return e += "\t)"
        }, CellPattern.prototype.generateMatchFunction = function() {
            for (var e, t = "", a = 1 === STRIDE_OBJ ? "" : "*" + STRIDE_OBJ, e = 0; e < STRIDE_OBJ; ++e) t += "\tvar cellObjects" + e + " = level.objects[i" + a + (e ? "+" + e : "") + "];\n";
            a = 1 === STRIDE_MOV ? "" : "*" + STRIDE_MOV;
            for (var e = 0; e < STRIDE_MOV; ++e) t += "\tvar cellMovements" + e + " = level.movements[i" + a + (e ? "+" + e : "") + "];\n";
            return t += "return " + this.generateMatchString() + ";", t in matchCache ? matchCache[t] : matchCache[t] = new Function("i", "level", t)
        }, CellPattern.prototype.toJSON = function() {
            return [this.movementMask, this.cellMask, this.nonExistenceMask, this.moveNonExistenceMask, this.moveStationaryMask, this.randomDirOrEntityMask, this.movementsToRemove]
        };
        var _o1, _o2, _o2_5, _o3, _o4, _o5, _o6, _o7, _o8, _o9, _o10, _o11, _o12, _m1, _m2, _m3;
        CellPattern.prototype.replace = function(e, t) {
            var a = this.replacement;
            if (null === a) return !1;
            var l = a.randomEntityMask,
                n = a.randomDirMask,
                r = a.objectsSet.cloneInto(_o1),
                o = a.objectsClear.cloneInto(_o2),
                i = a.movementsSet.cloneInto(_m1),
                s = a.movementsClear.cloneInto(_m2);
            if (s.ior(a.movementsLayerMask), !l.iszero()) {
                for (var c = [], v = 0; v < 32 * STRIDE_OBJ; v++) l.get(v) && c.push(v);
                var u = c[Math.floor(RandomGen.uniform() * c.length)],
                    d = state.idDict[u],
                    m = state.objects[d];
                r.ibitset(u), o.ior(state.layerMasks[m.layer]), s.ishiftor(31, 5 * m.layer)
            }
            if (!n.iszero())
                for (var g = 0; g < level.layerCount; g++)
                    if (n.get(5 * g)) {
                        var h = Math.floor(4 * RandomGen.uniform());
                        i.ibitset(h + 5 * g)
                    }
            var f = level.getCellInto(t, _o2_5),
                p = level.getMovements(t),
                y = f.cloneInto(_o3),
                S = p.cloneInto(_m3);
            f.iclear(o), f.ior(r), p.iclear(s), p.ior(i);
            var _ = !1,
                M = 0,
                b = 0;
            if (e.isRigid) {
                var k = state.groupNumber_to_RigidGroupIndex[e.groupNumber];
                k++;
                for (var I = new BitVec(STRIDE_MOV), w = 0; w < level.layerCount; w++) I.ishiftor(k, 5 * w);
                I.iand(a.movementsLayerMask), M = level.rigidGroupIndexMask[t] || new BitVec(STRIDE_MOV), b = level.rigidMovementAppliedMask[t] || new BitVec(STRIDE_MOV), I.bitsSetInArray(M.data) || a.movementsLayerMask.bitsSetInArray(b.data) || (M.ior(I), b.ior(a.movementsLayerMask), _ = !0)
            }
            var C = !1;
            if (!y.equals(f) || !S.equals(p) || _) {
                C = !0, _ && (level.rigidGroupIndexMask[t] = M, level.rigidMovementAppliedMask[t] = b);
                var R = f.cloneInto(_o4);
                R.iclear(y), sfxCreateMask.ior(R);
                var T = y.cloneInto(_o5);
                T.iclear(f), sfxDestroyMask.ior(T), level.setCell(t, f), level.setMovements(t, p);
                var E = t / level.height | 0,
                    D = t % level.height;
                level.colCellContents[E].ior(f), level.rowCellContents[D].ior(f), level.mapCellContents.ior(f)
            }
            return C
        };
        var rigidBackups = [];
        Rule.prototype.findMatches = function() {
            for (var e = [], t = this.cellRowMasks, a = 0; a < this.patterns.length; a++) {
                var l = this.patterns[a],
                    n = this.cellRowMatches[a];
                if (this.isEllipsis[a]) var r = matchCellRowWildCard(this.direction, n, l, t[a]);
                else var r = matchCellRow(this.direction, n, l, t[a]);
                if (0 === r.length) return [];
                e.push(r)
            }
            return e
        }, Rule.prototype.directional = function() {
            for (var e = 0; e < state.rules.length; e++)
                for (var t = state.rules[e], a = 0, l = 0; l < t.length; l++)
                    if (this.lineNumber === t[l].lineNumber && a++, a > 1) return !0;
            return !1
        }, Rule.prototype.applyAt = function(e, t, a) {
            var l = this;
            if (a) {
                for (var n = !0, r = 0; r < l.patterns.length; r++)
                    if (l.isEllipsis[r]) {
                        if (DoesCellRowMatchWildCard(l.direction, l.patterns[r], t[r][0], t[r][1] + 1, t[r][1]) === !1) {
                            n = !1;
                            break
                        }
                    } else if (DoesCellRowMatch(l.direction, l.patterns[r], t[r]) === !1) {
                    n = !1;
                    break
                }
                if (n === !1) return !1
            }
            for (var o = !1, i = e[0] * level.height, s = e[1], r = 0; r < l.patterns.length; r++)
                for (var c = l.patterns[r], v = l.isEllipsis[r] ? t[r][0] : t[r], u = 0; u < c.length; u++) {
                    var d = c[u];
                    if (d !== ellipsisPattern) o = d.replace(l, v) || o, v = v + s + i;
                    else {
                        var m = t[r][1];
                        v += (s + i) * m
                    }
                }
            if (verbose_logging && o) {
                var g = dirMaskName[l.direction];
                l.directional() || (g = "");
                var h = '<font color="green">Rule <a onclick="jumpToLine(' + l.lineNumber + ');" href="javascript:void(0);">' + l.lineNumber + "</a> " + g + " applied.</font>";
                consolePrint(h)
            }
            return o
        }, Rule.prototype.tryApply = function() {
            var e = dirMasksDelta[this.direction],
                t = this.findMatches();
            if (0 === t.length) return !1;
            var a = !1;
            if (this.hasReplacements)
                for (var l = generateTuples(t), n = 0; n < l.length; n++) {
                    var r = l[n],
                        o = n > 0,
                        i = this.applyAt(e, r, o);
                    a = i || a
                }
            return t.length > 0 && this.queueCommands(), a
        }, Rule.prototype.queueCommands = function() {
            for (var e = this.commands, t = 0; t < e.length; t++) {
                var a = e[t];
                if (!(level.commandQueue.indexOf(a[0]) >= 0)) {
                    if (level.commandQueue.push(a[0]), level.commandQueueSourceRules.push(this), verbose_logging) {
                        var l = this.lineNumber,
                            n = (dirMaskName[this.direction], '<font color="green">Rule <a onclick="jumpToLine(' + l.toString() + ');" href="javascript:void(0);">' + l.toString() + "</a> triggers command " + a[0] + ".</font>");
                        consolePrint(n, !0)
                    }
                    "message" === a[0] && (messagetext = a[1])
                }
            }
        };
        var sfxCreateMask = null,
            sfxDestroyMask = null;
    
        function logErrorCacheable(e, n, r) {
            if (compiling || r) {
                if (void 0 === n) return logErrorNoLine(e);
                var t = '<a onclick="jumpToLine(' + n.toString() + ');" href="javascript:void(0);"><span class="errorTextLineNumber"> line ' + n.toString() + '</span></a> : <span class="errorText">' + e + "</span>";
                errorStrings.indexOf(t) >= 0 && !r || (consolePrint(t), errorStrings.push(t), errorCount++)
            }
        }

        function logError(e, n, r) {
            if (compiling || r) {
                if (void 0 === n) return logErrorNoLine(e, r);
                var t = '<a onclick="jumpToLine(' + n.toString() + ');" href="javascript:void(0);"><span class="errorTextLineNumber"> line ' + n.toString() + '</span></a> : <span class="errorText">' + e + "</span>";
                errorStrings.indexOf(t) >= 0 && !r || (consolePrint(t, !0), errorStrings.push(t), errorCount++)
            }
        }

        function logWarning(e, n, r) {
            if (compiling || r) {
                if (void 0 === n) return logErrorNoLine(e);
                var t = '<a onclick="jumpToLine(' + n.toString() + ');" href="javascript:void(0);"><span class="errorTextLineNumber"> line ' + n.toString() + '</span></a> : <span class="warningText">' + e + "</span>";
                errorStrings.indexOf(t) >= 0 && !r || (consolePrint(t, !0), errorStrings.push(t))
            }
        }

        function logErrorNoLine(e, n) {
            if (compiling || n) {
                var r = '<span class="errorText">' + e + "</span>";
                errorStrings.indexOf(r) >= 0 && !n || (consolePrint(r, !0), errorStrings.push(r)), errorCount++
            }
        }

        function logBetaMessage(e, n) {
            if (compiling || n) {
                var r = '<span class="betaText">' + e + "</span>";
                errorStrings.indexOf(r) >= 0 && !n || (consoleError(r), errorStrings.push(r))
            }
        }

        function blankLineHandle(e) {
            "levels" === e.section ? e.levels[e.levels.length - 1].length > 0 && e.levels.push([]) : "objects" === e.section && (e.objects_section = 0)
        }
        var compiling = !1,
            errorStrings = [],
            errorCount = 0;
        "function" != typeof Object.assign && ! function() {
            Object.assign = function(e) {
                "use strict";
                if (void 0 === e || null === e) throw new TypeError("Cannot convert undefined or null to object");
                for (var n = Object(e), r = 1; r < arguments.length; r++) {
                    var t = arguments[r];
                    if (void 0 !== t && null !== t)
                        for (var o in t) t.hasOwnProperty(o) && (n[o] = t[o])
                }
                return n
            }
        }();
        var codeMirrorFn = function() {
            "use strict";

            function e(e, n) {
                if (void 0 !== e.objects[n]) return logError('Object "' + n.toUpperCase() + '" defined multiple times.', e.lineNumber), "ERROR";
                for (var r = 0; r < e.legend_synonyms.length; r++) {
                    var t = e.legend_synonyms[r];
                    t[0] == n && logError('Name "' + n.toUpperCase() + '" already in use.', e.lineNumber)
                }
                for (var r = 0; r < e.legend_aggregates.length; r++) {
                    var t = e.legend_aggregates[r];
                    t[0] == n && logError('Name "' + n.toUpperCase() + '" already in use.', e.lineNumber)
                }
                for (var r = 0; r < e.legend_properties.length; r++) {
                    var t = e.legend_properties[r];
                    t[0] == n && logError('Name "' + n.toUpperCase() + '" already in use.', e.lineNumber)
                }
            }
            var n = ["objects", "legend", "sounds", "collisionlayers", "rules", "winconditions", "levels"],
                r = ["sfx0", "sfx1", "sfx2", "sfx3", "sfx4", "sfx5", "sfx6", "sfx7", "sfx8", "sfx9", "sfx10", "cancel", "checkpoint", "restart", "win", "message", "again"],
                t = /[\w]+\s*/,
                o = /\d+\b/,
                s = /(objects|collisionlayers|legend|sounds|rules|winconditions|levels)(?![\w])\s*/,
                i = /[\=]+/,
                a = /[^\(]+/,
                l = /[ \,]*/,
                c = /(move|action|create|destroy|cantmove|undo|restart|titlescreen|startgame|cancel|endgame|startlevel|endlevel|showmessage|closemessage|sfx0|sfx1|sfx2|sfx3|sfx4|sfx5|sfx6|sfx7|sfx8|sfx9|sfx10)\s+/,
                g = /^(action|up|down|left|right|\^|v|\<|\>|moving|stationary|parallel|perpendicular|horizontal|orthogonal|vertical|no|randomdir|random)$/,
                u = /^(startloop|endloop)$/,
                d = /^(up|down|left|right|horizontal|vertical|orthogonal|late|rigid)$/,
                m = /\s*(up|down|left|right|horizontal|vertical|orthogonal)\s*/,
                f = /^(all|any|no|some)$/,
                p = ["checkpoint", "objects", "collisionlayers", "legend", "sounds", "rules", "...", "winconditions", "levels", "|", "[", "]", "up", "down", "left", "right", "late", "rigid", "^", "v", ">", "<", "no", "randomdir", "random", "horizontal", "vertical", "any", "all", "no", "some", "moving", "stationary", "parallel", "perpendicular", "action", "message"];
            return {
                copyState: function(e) {
                    var n = {};
                    for (var r in e.objects)
                        if (e.objects.hasOwnProperty(r)) {
                            var t = e.objects[r];
                            n[r] = {
                                colors: t.colors.concat([]),
                                lineNumber: t.lineNumber,
                                spritematrix: t.spritematrix.concat([])
                            }
                        }
                    for (var o = [], r = 0; r < e.collisionLayers.length; r++) o.push(e.collisionLayers[r].concat([]));
                    for (var s = [], i = [], a = [], l = [], c = [], g = [], r = 0; r < e.legend_synonyms.length; r++) s.push(e.legend_synonyms[r].concat([]));
                    for (var r = 0; r < e.legend_aggregates.length; r++) i.push(e.legend_aggregates[r].concat([]));
                    for (var r = 0; r < e.legend_properties.length; r++) a.push(e.legend_properties[r].concat([]));
                    for (var r = 0; r < e.sounds.length; r++) l.push(e.sounds[r].concat([]));
                    for (var r = 0; r < e.levels.length; r++) c.push(e.levels[r].concat([]));
                    for (var r = 0; r < e.winconditions.length; r++) g.push(e.winconditions[r].concat([]));
                    var u = Object.assign({}, e.original_case_names),
                        d = {
                            lineNumber: e.lineNumber,
                            objects: n,
                            collisionLayers: o,
                            commentLevel: e.commentLevel,
                            section: e.section,
                            visitedSections: e.visitedSections.concat([]),
                            objects_candname: e.objects_candname,
                            objects_section: e.objects_section,
                            objects_spritematrix: e.objects_spritematrix.concat([]),
                            tokenIndex: e.tokenIndex,
                            legend_synonyms: s,
                            legend_aggregates: i,
                            legend_properties: a,
                            sounds: l,
                            rules: e.rules.concat([]),
                            names: e.names.concat([]),
                            winconditions: g,
                            original_case_names: u,
                            abbrevNames: e.abbrevNames.concat([]),
                            metadata: e.metadata.concat([]),
                            levels: c,
                            STRIDE_OBJ: e.STRIDE_OBJ,
                            STRIDE_MOV: e.STRIDE_MOV
                        };
                    return d
                },
                blankLine: function(e) {
                    "levels" === e.section && e.levels[e.levels.length - 1].length > 0 && e.levels.push([])
                },
                token: function(h, v) {
                    function b(e) {
                        function n(e) {
                            return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
                        }
                        var r = new RegExp("\\b" + n(e) + "\\b", "i"),
                            t = x.match(r);
                        null != t && (v.original_case_names[e] = t[0])
                    }
                    var x = h.string,
                        _ = h.sol();
                    _ && (h.string = h.string.toLowerCase(), v.tokenIndex = 0), h.eatWhile(/[ \t]/);
                    var E = h.peek();
                    if ("(" === E && v.tokenIndex !== -4) h.next(), v.commentLevel++;
                    else if (")" === E && (h.next(), v.commentLevel > 0 && (v.commentLevel--, 0 === v.commentLevel))) return "comment";
                    if (v.commentLevel > 0) {
                        for (;;) {
                            if (h.eatWhile(/[^\(\)]+/), h.eol()) break;
                            if (E = h.peek(), "(" === E ? v.commentLevel++ : ")" === E && v.commentLevel--, h.next(), 0 === v.commentLevel) break
                        }
                        return "comment"
                    }
                    if (h.eatWhile(/[ \t]/), _ && h.eol()) return blankLineHandle(v);
                    if (_ && h.match(i, !0)) return "EQUALSBIT";
                    if (h.match(s, !0)) {
                        v.section = h.string.slice(0, h.pos).trim(), v.visitedSections.indexOf(v.section) >= 0 && logError('cannot duplicate sections (you tried to duplicate "' + v.section.toUpperCase() + '").', v.lineNumber), v.visitedSections.push(v.section);
                        var y = n.indexOf(v.section);
                        if (0 == y ? (v.objects_section = 0, v.visitedSections.length > 1 && logError('section "' + v.section.toUpperCase() + '" must be the first section', v.lineNumber)) : v.visitedSections.indexOf(n[y - 1]) == -1 && (y === -1 ? logError('no such section as "' + v.section.toUpperCase() + '".', v.lineNumber) : logError('section "' + v.section.toUpperCase() + '" is out of order, must follow "' + n[y - 1].toUpperCase() + '".', v.lineNumber)), "sounds" === v.section) {
                            for (var N in v.objects) v.objects.hasOwnProperty(N) && v.names.push(N);
                            for (var O = 0; O < v.legend_synonyms.length; O++) {
                                var N = v.legend_synonyms[O][0];
                                v.names.push(N)
                            }
                            for (var O = 0; O < v.legend_aggregates.length; O++) {
                                var N = v.legend_aggregates[O][0];
                                v.names.push(N)
                            }
                            for (var O = 0; O < v.legend_properties.length; O++) {
                                var N = v.legend_properties[O][0];
                                v.names.push(N)
                            }
                        } else if ("levels" === v.section) {
                            for (var N in v.objects) v.objects.hasOwnProperty(N) && 1 == N.length && v.abbrevNames.push(N);
                            for (var O = 0; O < v.legend_synonyms.length; O++) 1 == v.legend_synonyms[O][0].length && v.abbrevNames.push(v.legend_synonyms[O][0]);
                            for (var O = 0; O < v.legend_aggregates.length; O++) 1 == v.legend_aggregates[O][0].length && v.abbrevNames.push(v.legend_aggregates[O][0])
                        }
                        return "HEADER"
                    }
                    if (void 0 === v.section && logError('must start with section "OBJECTS"', v.lineNumber), h.eol()) return null;
                    switch (v.section) {
                        case "objects":
                            var R = function() {
                                var e = _ ? h.match(t, !0) : h.match(/[^\s\()]+\s*/, !0);
                                if (null == e) return h.match(a, !0), h.pos > 0 && logWarning('Unknown junk in object section (possibly: sprites have to be 5 pixels wide and 5 pixels high exactly. Or maybe: the main names for objects have to be words containing only the letters a-z0.9 - if you want to call them something like ",", do it in the legend section).', v.lineNumber), "ERROR";
                                var n = e[0].trim();
                                if (void 0 !== v.objects[n]) return logError('Object "' + n.toUpperCase() + '" defined multiple times.', v.lineNumber), "ERROR";
                                for (var r = 0; r < v.legend_synonyms.length; r++) {
                                    var o = v.legend_synonyms[r];
                                    o[0] == n && logError('Name "' + n.toUpperCase() + '" already in use.', v.lineNumber)
                                }
                                if (p.indexOf(n) >= 0 && logWarning('You named an object "' + n.toUpperCase() + "\", but this is a keyword. Don't do that!", v.lineNumber), _) v.objects_candname = n, b(n), v.objects[v.objects_candname] = {
                                    lineNumber: v.lineNumber,
                                    colors: [],
                                    spritematrix: []
                                };
                                else {
                                    b(n);
                                    var s = [n, v.objects_candname];
                                    s.lineNumber = v.lineNumber, v.legend_synonyms.push(s)
                                }
                                return v.objects_section = 1, "NAME"
                            };
                            switch (_ && 2 == v.objects_section && (v.objects_section = 3), _ && 1 == v.objects_section && (v.objects_section = 2), v.objects_section) {
                                case 0:
                                case 1:
                                    return v.objects_spritematrix = [], R();
                                case 2:
                                    v.tokenIndex = 0;
                                    var j = h.match(reg_color, !0);
                                    if (null == j) {
                                        var k = h.match(t, !0) || h.match(a, !0);
                                        return logError("Was looking for color for object " + v.objects_candname.toUpperCase() + ', got "' + k + '" instead.', v.lineNumber), null
                                    }
                                    void 0 === v.objects[v.objects_candname].colors ? v.objects[v.objects_candname].colors = [j[0].trim()] : v.objects[v.objects_candname].colors.push(j[0].trim());
                                    var C = j[0].trim().toLowerCase();
                                    return C in colorPalettes.arnecolors ? "COLOR COLOR-" + C.toUpperCase() : "transparent" === C ? "COLOR FADECOLOR" : "MULTICOLOR" + j[0];
                                case 3:
                                    var E = h.eat(/[.\d]/),
                                        L = v.objects_spritematrix;
                                    if (void 0 === E) return 0 === L.length ? R() : (logError("Unknown junk in spritematrix for object " + v.objects_candname.toUpperCase() + ".", v.lineNumber), h.match(a, !0), null);
                                    _ && L.push("");
                                    var I = v.objects[v.objects_candname];
                                    if (L[L.length - 1] += E, L[L.length - 1].length > 5) return logError("Sprites must be 5 wide and 5 high.", v.lineNumber), h.match(a, !0), null;
                                    if (I.spritematrix = v.objects_spritematrix, 5 === L.length && 5 == L[L.length - 1].length && (v.objects_section = 0), "." !== E) {
                                        var N = parseInt(E);
                                        return N >= I.colors.length ? (logError("Trying to access color number " + N + " from the color palette of sprite " + v.objects_candname.toUpperCase() + ", but there are only " + I.colors.length + " defined in it.", v.lineNumber), "ERROR") : isNaN(N) ? (logError('Invalid character "' + E + '" in sprite for ' + v.objects_candname.toUpperCase(), v.lineNumber), "ERROR") : "COLOR BOLDCOLOR COLOR-" + I.colors[N].toUpperCase()
                                    }
                                    return "COLOR FADECOLOR";
                                default:
                                    window.console.logError("EEK shouldn't get here.")
                            }
                            break;
                        case "sounds":
                            if (_) {
                                var w = !0,
                                    S = a.exec(h.string)[0].split(/\s/).filter(function(e) {
                                        return "" !== e
                                    });
                                S.push(v.lineNumber), v.sounds.push(S)
                            }
                            if (U = h.match(c, !0), null !== U) return "SOUNDVERB";
                            if (U = h.match(m, !0), null !== U) return "DIRECTION";
                            if (U = h.match(o, !0), null !== U) return v.tokenIndex++, "SOUND";
                            if (U = h.match(/[^\[\|\]\s]*/, !0), null !== U) {
                                var T = U[0].trim();
                                if (v.names.indexOf(T) >= 0) return "NAME"
                            }
                            return U = h.match(a, !0), logError('unexpected sound token "' + U + '".', v.lineNumber), h.match(a, !0), "ERROR";
                        case "collisionlayers":
                            _ && (v.collisionLayers.push([]), v.tokenIndex = 0);
                            var A = h.match(t, !0);
                            if (null === A) {
                                var D = h.pos;
                                return h.match(l, !0), h.pos == D && (logError("error detected - unexpected character " + h.peek(), v.lineNumber), h.next()), null
                            }
                            var U = A[0].trim(),
                                M = function(e) {
                                    if (e = e.toLowerCase(), e in v.objects) return [e];
                                    for (var n = 0; n < v.legend_synonyms.length; n++) {
                                        var r = v.legend_synonyms[n];
                                        if (r[0] === e) return M(r[1])
                                    }
                                    for (var n = 0; n < v.legend_aggregates.length; n++) {
                                        var r = v.legend_aggregates[n];
                                        if (r[0] === e) return logError('"' + e + '" is an aggregate (defined using "and"), and cannot be added to a single layer because its constituent objects must be able to coexist.', v.lineNumber), []
                                    }
                                    for (var n = 0; n < v.legend_properties.length; n++) {
                                        var r = v.legend_properties[n];
                                        if (r[0] === e) {
                                            var t = [].concat.apply([], r.slice(1).map(M));
                                            return t
                                        }
                                    }
                                    return logError('Cannot add "' + U.toUpperCase() + '" to a collision layer; it has not been declared.', v.lineNumber), []
                                };
                            "background" === U ? (v.collisionLayers.length > 0 && v.collisionLayers[v.collisionLayers.length - 1].length > 0 && logError("Background must be in a layer by itself.", v.lineNumber), v.tokenIndex = 1) : 0 !== v.tokenIndex && logError("Background must be in a layer by itself.", v.lineNumber);
                            var B = M(U);
                            if (0 === v.collisionLayers.length) return logError("no layers found.", v.lineNumber), "ERROR";
                            for (var W = [], O = 0; O < B.length; O++)
                                for (var U = B[O], G = 0; G <= v.collisionLayers.length - 1; G++) {
                                    var P = v.collisionLayers[G];
                                    P.indexOf(U) >= 0 && G != v.collisionLayers.length - 1 && W.push(G)
                                }
                            if (W.length > 0) {
                                for (var z = 'Object "' + U.toUpperCase() + '" included in multiple collision layers ( layers ', O = 0; O < W.length; O++) z += W[O] + ", ";
                                z += v.collisionLayers.length - 1, logWarning(z + "). You should fix this!", v.lineNumber)
                            }
                            return v.collisionLayers[v.collisionLayers.length - 1] = v.collisionLayers[v.collisionLayers.length - 1].concat(B), B.length > 0 ? "NAME" : "ERROR";
                        case "legend":
                            if (_) {
                                var $ = h.string.replace("=", " = ");
                                $ = a.exec($)[0];
                                var S = $.split(/\s/).filter(function(e) {
                                        return "" !== e
                                    }),
                                    w = !0;
                                if (S.length > 0) {
                                    var U = S[0].toLowerCase();
                                    p.indexOf(U) >= 0 && logWarning('You named an object "' + U.toUpperCase() + "\", but this is a keyword. Don't do that!", v.lineNumber), S.indexOf(U, 2) >= 2 && (logError("You can't define object " + U.toUpperCase() + " in terms of itself!", v.lineNumber), w = !1), e(v, U)
                                }
                                if (w)
                                    if (S.length < 3) w = !1;
                                    else if ("=" !== S[1]) w = !1;
                                else if (3 === S.length) {
                                    var V = [S[0], S[2].toLowerCase()];
                                    V.lineNumber = v.lineNumber, b(S[0]), v.legend_synonyms.push(V)
                                } else if (S.length % 2 === 0) w = !1;
                                else {
                                    var F = S[3].toLowerCase();
                                    if ("and" === F) {
                                        for (var M = (function(e) {
                                                if (e = e.toLowerCase(), e in v.objects) return [e];
                                                for (var n = 0; n < v.legend_synonyms.length; n++) {
                                                    var r = v.legend_synonyms[n];
                                                    if (r[0] === e) return M(r[1])
                                                }
                                                for (var n = 0; n < v.legend_aggregates.length; n++) {
                                                    var r = v.legend_aggregates[n];
                                                    if (r[0] === e) return [].concat.apply([], r.slice(1).map(M))
                                                }
                                                for (var n = 0; n < v.legend_properties.length; n++) {
                                                    var r = v.legend_properties[n];
                                                    if (r[0] === e) return logError("Cannot define an aggregate (using 'and') in terms of properties (something that uses 'or').", v.lineNumber), w = !1, [e]
                                                }
                                                return [e]
                                            }), O = 5; O < S.length; O += 2)
                                            if ("and" !== S[O].toLowerCase()) {
                                                w = !1;
                                                break
                                            }
                                        if (w) {
                                            for (var K = [S[0]].concat(M(S[2])).concat(M(S[4])), O = 6; O < S.length; O += 2) K = K.concat(M(S[O]));
                                            K.lineNumber = v.lineNumber, b(K[0]), v.legend_aggregates.push(K)
                                        }
                                    } else if ("or" === F) {
                                        for (var M = (function(e) {
                                                if (e = e.toLowerCase(), e in v.objects) return [e];
                                                for (var n = 0; n < v.legend_synonyms.length; n++) {
                                                    var r = v.legend_synonyms[n];
                                                    if (r[0] === e) return M(r[1])
                                                }
                                                for (var n = 0; n < v.legend_aggregates.length; n++) {
                                                    var r = v.legend_aggregates[n];
                                                    r[0] === e && (logError("Cannot define a property (using 'or') in terms of aggregates (something that uses 'and').", v.lineNumber), w = !1)
                                                }
                                                for (var n = 0; n < v.legend_properties.length; n++) {
                                                    var r = v.legend_properties[n];
                                                    if (r[0] === e) return [].concat.apply([], r.slice(1).map(M))
                                                }
                                                return [e]
                                            }), O = 5; O < S.length; O += 2)
                                            if ("or" !== S[O].toLowerCase()) {
                                                w = !1;
                                                break
                                            }
                                        if (w) {
                                            for (var K = [S[0]].concat(M(S[2])).concat(M(S[4])), O = 6; O < S.length; O += 2) K.push(S[O].toLowerCase());
                                            K.lineNumber = v.lineNumber, b(K[0]), v.legend_properties.push(K)
                                        }
                                    } else w = !1
                                } else;
                                if (w === !1) return logError("incorrect format of legend - should be one of A = B, A = B or C ( or D ...), A = B and C (and D ...)", v.lineNumber), h.match(a, !0), "ERROR";
                                v.tokenIndex = 0
                            }
                            if (0 === v.tokenIndex) return h.match(/[^=]*/, !0), v.tokenIndex++, "NAME";
                            if (1 === v.tokenIndex) return h.next(), h.match(/\s*/, !0), v.tokenIndex++, "ASSSIGNMENT";
                            var A = h.match(t, !0);
                            if (null === A) return logError("Something bad's happening in the LEGEND", v.lineNumber), h.match(a, !0), "ERROR";
                            var U = A[0].trim();
                            if (v.tokenIndex % 2 === 0) {
                                var Y = function(e) {
                                    if (e = e.toLowerCase(), e in v.objects) return !0;
                                    for (var n = 0; n < v.legend_aggregates.length; n++) {
                                        var r = v.legend_aggregates[n];
                                        if (r[0] === e) return !0
                                    }
                                    for (var n = 0; n < v.legend_properties.length; n++) {
                                        var r = v.legend_properties[n];
                                        if (r[0] === e) return !0
                                    }
                                    for (var n = 0; n < v.legend_synonyms.length; n++) {
                                        var r = v.legend_synonyms[n];
                                        if (r[0] === e) return !0
                                    }
                                    return !1
                                };
                                return Y(U) === !1 ? (logError('Cannot reference "' + U.toUpperCase() + '" in the LEGEND section; it has not been defined yet.', v.lineNumber), v.tokenIndex++, "ERROR") : (v.tokenIndex++, "NAME")
                            }
                            return v.tokenIndex++, "LOGICWORD";
                        case "rules":
                            if (_) {
                                var H = a.exec(h.string)[0];
                                v.rules.push([H, v.lineNumber, x]), v.tokenIndex = 0
                            }
                            if (v.tokenIndex === -4) return h.skipToEnd(), "MESSAGE";
                            if (h.match(/\s*\-\>\s*/, !0)) return "ARROW";
                            if ("[" === E || "|" === E || "]" === E || "+" === E) return "+" !== E && (v.tokenIndex = 1), h.next(), h.match(/\s*/, !0), "BRACKET";
                            var T = h.match(/[^\[\|\]\s]*/, !0)[0].trim();
                            return 0 === v.tokenIndex && u.exec(T) ? "BRACKET" : 0 === v.tokenIndex && d.exec(T) ? (h.match(/\s*/, !0), "DIRECTION") : 1 === v.tokenIndex && g.exec(T) ? (h.match(/\s*/, !0), "DIRECTION") : v.names.indexOf(T) >= 0 ? _ ? (logError("Identifiers cannot appear outside of square brackets in rules, only directions can.", v.lineNumber), "ERROR") : (h.match(/\s*/, !0), "NAME") : "..." === T ? "DIRECTION" : "rigid" === T ? "DIRECTION" : "random" === T ? "DIRECTION" : r.indexOf(T) >= 0 ? ("message" === T && (v.tokenIndex = -4), "COMMAND") : (logError('Name "' + T + '", referred to in a rule, does not exist.', v.lineNumber), "ERROR");
                        case "winconditions":
                            if (_) {
                                var J = a.exec(h.string),
                                    q = J[0].split(/\s/),
                                    Q = q.filter(function(e) {
                                        return "" !== e
                                    });
                                Q.push(v.lineNumber), v.winconditions.push(Q), v.tokenIndex = -1
                            }
                            v.tokenIndex++;
                            var X = h.match(/\s*\w+\s*/);
                            if (null === X) return logError("incorrect format of win condition.", v.lineNumber), h.match(a, !0), "ERROR";
                            var Z = X[0].trim();
                            if (0 === v.tokenIndex) return f.exec(Z) ? "LOGICWORD" : "ERROR";
                            if (2 === v.tokenIndex) return "on" != Z ? "ERROR" : "LOGICWORD";
                            if (1 === v.tokenIndex || 3 === v.tokenIndex) return v.names.indexOf(Z) === -1 ? (logError('Error in win condition: "' + Z.toUpperCase() + '" is not a valid object name.', v.lineNumber), "ERROR") : "NAME";
                            break;
                        case "levels":
                            if (_) {
                                if (h.match(/\s*message\s*/, !0)) {
                                    v.tokenIndex = 1;
                                    var ee = ["\n", x.slice(h.pos).trim(), v.lineNumber];
                                    return 0 == v.levels[v.levels.length - 1].length ? v.levels.splice(v.levels.length - 1, 0, ee) : v.levels.push(ee), "MESSAGE_VERB"
                                }
                                var ne = h.match(a, !1)[0].trim();
                                v.tokenIndex = 2;
                                var re = v.levels[v.levels.length - 1];
                                "\n" == re[0] ? v.levels.push([v.lineNumber, ne]) : (0 == re.length && re.push(v.lineNumber), re.push(ne), re.length > 1 && ne.length != re[1].length && logWarning("Maps must be rectangular, yo (In a level, the length of each row must be the same).", v.lineNumber))
                            } else if (1 == v.tokenIndex) return h.skipToEnd(), "MESSAGE";
                            if (2 === v.tokenIndex && !h.eol()) {
                                var E = h.peek();
                                return h.next(), v.abbrevNames.indexOf(E) >= 0 ? "LEVEL" : (logError('Key "' + E.toUpperCase() + '" not found. Do you need to add it to the legend, or define a new object?', v.lineNumber), "ERROR")
                            }
                            break;
                        default:
                            if (_ && (v.tokenIndex = 0), 0 != v.tokenIndex) return h.match(a, !0), "METADATATEXT";
                            var X = h.match(/\s*\w+\s*/);
                            if (null !== X) {
                                var te = X[0].trim();
                                if (_) {
                                    if (["title", "author", "homepage", "background_color", "text_color", "key_repeat_interval", "realtime_interval", "again_interval", "flickscreen", "zoomscreen", "color_palette", "youtube"].indexOf(te) >= 0) {
                                        "youtube" !== te && "author" !== te && "title" !== te || (h.string = x);
                                        var oe = h.match(a, !1);
                                        return null != oe ? (v.metadata.push(te), v.metadata.push(oe[0].trim())) : logError('MetaData "' + te + '" needs a value.', v.lineNumber), v.tokenIndex = 1, "METADATA"
                                    }
                                    return ["run_rules_on_level_start", "norepeat_action", "require_player_movement", "debug", "verbose_logging", "throttle_movement", "noundo", "noaction", "norestart", "scanline"].indexOf(te) >= 0 ? (v.metadata.push(te), v.metadata.push("true"), v.tokenIndex = -1, "METADATA") : (logError("Unrecognised stuff in the prelude.", v.lineNumber), "ERROR")
                                }
                                return v.tokenIndex == -1 ? (logError('MetaData "' + te + '" has no parameters.', v.lineNumber), "ERROR") : "METADATA"
                            }
                    }
                    return h.eol() ? null : h.eol() ? void 0 : (h.next(), null)
                },
                startState: function() {
                    return {
                        objects: {},
                        lineNumber: 0,
                        commentLevel: 0,
                        section: "",
                        visitedSections: [],
                        objects_candname: "",
                        objects_section: 0,
                        objects_spritematrix: [],
                        collisionLayers: [],
                        tokenIndex: 0,
                        legend_synonyms: [],
                        legend_aggregates: [],
                        legend_properties: [],
                        sounds: [],
                        rules: [],
                        names: [],
                        winconditions: [],
                        metadata: [],
                        original_case_names: {},
                        abbrevNames: [],
                        levels: [
                            []
                        ],
                        subsection: ""
                    }
                }
            }
        };
        window.CodeMirror.defineMode("puzzle", codeMirrorFn);
    
        "use strict";

        function isColor(e) {
            return e = e.trim(), e in colorPalettes.arnecolors || (!!/^#([0-9A-F]{3}){1,2}$/i.test(e) || "transparent" === e)
        }

        function colorToHex(e, r) {
            return r = r.trim(), r in e ? e[r] : r
        }

        function generateSpriteMatrix(e) {
            for (var r = [], o = 0; o < e.length; o++) {
                for (var t = [], n = 0; n < e.length; n++) {
                    var a = e[o].charAt(n);
                    "." == a ? t.push(-1) : t.push(a)
                }
                r.push(t)
            }
            return r
        }

        function generateExtraMembers(e) {
            0 === e.collisionLayers.length && logError("No collision layers defined. All objects need to be in collision layers."), e.idDict = {};
            for (var r = 0, o = 0; o < e.collisionLayers.length; o++)
                for (var t = 0; t < e.collisionLayers[o].length; t++) {
                    var n = e.collisionLayers[o][t];
                    if (n in e.objects) {
                        var a = e.objects[n];
                        a.layer = o, a.id = r, e.idDict[r] = n, r++
                    }
                }
            e.objectCount = r;
            for (var i = e.collisionLayers.length, l = [], s = 0; s < i; s++) l.push(-1);
            STRIDE_OBJ = 0 | Math.ceil(e.objectCount / 32), STRIDE_MOV = 0 | Math.ceil(i / 5), e.STRIDE_OBJ = STRIDE_OBJ, e.STRIDE_MOV = STRIDE_MOV, debugMode = !1, verbose_logging = !1, throttle_movement = !1, colorPalette = colorPalettes.arnecolors;
            for (var s = 0; s < e.metadata.length; s += 2) {
                var c = e.metadata[s],
                    g = e.metadata[s + 1];
                "color_palette" === c ? (g in colorPalettesAliases && (g = colorPalettesAliases[g]), void 0 === colorPalettes[g] ? logError('Palette "' + g + '" not found, defaulting to arnecolors.', 0) : colorPalette = colorPalettes[g]) : "debug" === c ? (debugMode = !0, cache_console_messages = !0) : "verbose_logging" === c ? (verbose_logging = !0, cache_console_messages = !0) : "throttle_movement" === c && (throttle_movement = !0)
            }
            for (var n in e.objects)
                if (e.objects.hasOwnProperty(n)) {
                    var a = e.objects[n];
                    a.colors.length > 10 && logError("a sprite cannot have more than 10 colors. Why you would want more than 10 is beyond me.", a.lineNumber + 1);
                    for (var s = 0; s < a.colors.length; s++) {
                        var h = a.colors[s];
                        isColor(h) ? (h = colorToHex(colorPalette, h), a.colors[s] = h) : (logError('Invalid color specified for object "' + n + '", namely "' + a.colors[s] + '".', a.lineNumber + 1), a.colors[s] = "#ff00ff")
                    }
                }
            for (var n in e.objects)
                if (e.objects.hasOwnProperty(n)) {
                    var a = e.objects[n];
                    0 == a.colors.length && (logError('color not specified for object "' + n + '".', a.lineNumber), a.colors = ["#ff00ff"]), 0 === a.spritematrix.length ? a.spritematrix = [
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0]
                    ] : (5 === a.spritematrix.length && 5 === a.spritematrix[0].length && 5 === a.spritematrix[1].length && 5 === a.spritematrix[2].length && 5 === a.spritematrix[3].length && 5 === a.spritematrix[4].length || logWarning("Sprite graphics must be 5 wide and 5 high exactly.", a.lineNumber), a.spritematrix = generateSpriteMatrix(a.spritematrix))
                }
            var u = {};
            for (var n in e.objects)
                if (e.objects.hasOwnProperty(n)) {
                    var a = e.objects[n],
                        p = l.concat([]);
                    p[a.layer] = a.id, u[n] = p
                }
            for (var f = !0; f;) {
                f = !1;
                for (var s = 0; s < e.legend_synonyms.length; s++) {
                    var d = e.legend_synonyms[s],
                        c = d[0],
                        g = d[1];
                    c in u && void 0 !== u[c] || void 0 === u[g] || (f = !0, u[c] = u[g])
                }
                for (var s = 0; s < e.legend_aggregates.length; s++) {
                    for (var d = e.legend_aggregates[s], c = d[0], v = d.slice(1), m = !0, t = 0; t < v.length; t++) {
                        var b = v[t];
                        if (void 0 === u[b]) {
                            m = !1;
                            break
                        }
                    }
                    if ((!(c in u) || void 0 === u[c]) && m) {
                        for (var p = l.concat([]), t = 1; t < d.length; t++) {
                            var n = d[t],
                                a = e.objects[n];
                            if (void 0 == a && logError("Object not found with name " + n, e.lineNumber), p[a.layer] == -1) p[a.layer] = a.id;
                            else if (void 0 === a.layer) logError('Object "' + n.toUpperCase() + '" has been defined, but not assigned to a layer.', d.lineNumber);
                            else {
                                var y = n.toUpperCase(),
                                    R = e.idDict[p[a.layer]].toUpperCase();
                                y !== R && logError('Trying to create an aggregate object (defined in the legend) with both "' + y + '" and "' + R + "\", which are on the same layer and therefore can't coexist.", d.lineNumber)
                            }
                        }
                        f = !0, u[d[0]] = p
                    }
                }
            }
            e.glyphDict = u;
            for (var w = {}, s = 0; s < e.legend_aggregates.length; s++) {
                var E = e.legend_aggregates[s];
                w[E[0]] = E.slice(1)
            }
            e.aggregatesDict = w;
            for (var k = {}, s = 0; s < e.legend_properties.length; s++) {
                var E = e.legend_properties[s];
                k[E[0]] = E.slice(1)
            }
            e.propertiesDict = k;
            for (var D = {}, s = 0; s < e.legend_synonyms.length; s++) {
                var E = e.legend_synonyms[s],
                    c = E[0],
                    _ = E[1];
                _ in w ? w[c] = w[_] : _ in k ? k[c] = k[_] : c !== _ && (D[c] = _)
            }
            e.synonymsDict = D;
            for (var I = !0; I;) {
                I = !1;
                for (var n in D)
                    if (D.hasOwnProperty(n)) {
                        var _ = D[n];
                        _ in k ? (delete D[n], k[n] = k[_], I = !0) : _ in w ? (delete w[n], w[n] = w[_], I = !0) : _ in D && (D[n] = D[_])
                    }
                for (var n in k)
                    if (k.hasOwnProperty(n))
                        for (var M = k[n], s = 0; s < M.length; s++) {
                            var _ = M[s];
                            if (_ in D) M[s] = D[_], I = !0;
                            else if (_ in k) {
                                M.splice(s, 1);
                                for (var x = k[_], t = 0; t < x.length; t++) {
                                    var j = x[t];
                                    M.indexOf(j) === -1 && M.push(j)
                                }
                                I = !0
                            }
                            _ in w && logError('Trying to define property "' + n.toUpperCase() + '" in terms of aggregate "' + _.toUpperCase() + '".')
                        }
                    for (var n in w)
                        if (w.hasOwnProperty(n))
                            for (var M = w[n], s = 0; s < M.length; s++) {
                                var _ = M[s];
                                if (_ in D) M[s] = D[_], I = !0;
                                else if (_ in w) {
                                    M.splice(s, 1);
                                    for (var x = w[_], t = 0; t < x.length; t++) {
                                        var j = x[t];
                                        M.indexOf(j) === -1 && M.push(j)
                                    }
                                    I = !0
                                }
                                _ in k && logError('Trying to define aggregate "' + n.toUpperCase() + '" in terms of property "' + _.toUpperCase() + '".')
                            }
            }
            e.propertiesSingleLayer = {};
            for (var c in k)
                if (k.hasOwnProperty(c)) {
                    for (var M = k[c], N = !0, s = 1; s < M.length; s++)
                        if (e.objects[M[s - 1]].layer !== e.objects[M[s]].layer) {
                            N = !1;
                            break
                        }
                    N && (e.propertiesSingleLayer[c] = e.objects[M[0]].layer)
                }
            void 0 === e.idDict[0] && e.collisionLayers.length > 0 && logError("You need to have some objects defined");
            var C, O;
            if (void 0 === e.objects.background)
                if ("background" in e.synonymsDict) {
                    var n = e.synonymsDict.background,
                        a = e.objects[n];
                    C = a.id, O = a.layer
                } else if ("background" in e.propertiesDict) {
                var n = e.propertiesDict.background[0],
                    a = e.objects[n];
                C = a.id, O = a.layer
            } else if ("background" in e.aggregatesDict) {
                var a = e.objects[e.idDict[0]];
                C = a.id, O = a.layer, logError("background cannot be an aggregate (declared with 'and'), it has to be a simple type, or property (declared in terms of others using 'or').")
            } else {
                var a = e.objects[e.idDict[0]];
                C = a.id, O = a.layer, logError("you have to define something to be the background")
            } else C = e.objects.background.id, O = e.objects.background.layer;
            e.backgroundid = C, e.backgroundlayer = O
        }

        function levelFromString(e, r) {
            var o = e.backgroundlayer,
                t = (e.backgroundid, e.layerMasks[o]),
                n = new Level(r[0], r[1].length, r.length - 1, e.collisionLayers.length, null);
            n.objects = new Int32Array(n.width * n.height * STRIDE_OBJ);
            for (var a = 0; a < n.width; a++)
                for (var i = 0; i < n.height; i++) {
                    var l = r[i + 1].charAt(a);
                    0 == l.length && (l = r[i + 1].charAt(r[i + 1].length - 1));
                    var s = e.glyphDict[l];
                    void 0 == s && (void 0 === e.propertiesDict[l] ? logError('Error, symbol "' + l + '", used in map, not found.', r[0] + i) : logError('Error, symbol "' + l + "\" is defined using 'or', and therefore ambiguous - it cannot be used in a map. Did you mean to define it in terms of 'and'?", r[0] + i));
                    var c = new BitVec(STRIDE_OBJ);
                    s = s.concat([]);
                    for (var g = 0; g < n.layerCount; g++) s[g] >= 0 && c.ibitset(s[g]);
                    for (var h = 0; h < STRIDE_OBJ; ++h) n.objects[STRIDE_OBJ * (a * n.height + i) + h] = c.data[h]
                }
            for (var u = n.calcBackgroundMask(e), a = 0; a < n.n_tiles; a++) {
                var p = n.getCell(a);
                t.anyBitsInCommon(p) || p.ior(u), n.setCell(a, p)
            }
            return n
        }

        function levelsToArray(e) {
            for (var r = e.levels, o = [], t = 0; t < r.length; t++) {
                var n = r[t];
                if (0 != n.length)
                    if ("\n" == n[0]) {
                        var a = {
                            message: n[1]
                        };
                        splitMessage = wordwrap(a.message, intro_template[0].length), splitMessage.length > 12 && logWarning("Message too long to fit on screen.", n[2]), o.push(a)
                    } else {
                        var a = levelFromString(e, n);
                        o.push(a)
                    }
            }
            e.levels = o
        }

        function directionalRule(e) {
            for (var r = 0; r < e.lhs.length; r++) {
                var o = e.lhs[r];
                if (o.length > 1) return !0;
                for (var t = 0; t < o.length; t++)
                    for (var n = o[t], a = 0; a < n.length; a += 2)
                        if (relativeDirections.indexOf(n[a]) >= 0) return !0
            }
            for (var r = 0; r < e.rhs.length; r++) {
                var o = e.rhs[r];
                if (o.length > 1) return !0;
                for (var t = 0; t < o.length; t++)
                    for (var n = o[t], a = 0; a < n.length; a += 2)
                        if (relativeDirections.indexOf(n[a]) >= 0) return !0
            }
            return !1
        }

        function findIndexAfterToken(e, r, o) {
            e = e.toLowerCase();
            for (var t = 0, n = 0; n <= o; n++) {
                var a = r[n];
                t = e.indexOf(a, t) + a.length
            }
            return t
        }

        function processRuleString(e, r, o) {
            var t = e[0],
                n = e[1],
                a = e[2];
            t = t.replace(/\[/g, " [ ").replace(/\]/g, " ] ").replace(/\|/g, " | ").replace(/\-\>/g, " -> "), t = t.trim(), "+" === t[0] && (t = t.substring(0, 1) + " " + t.substring(1, t.length));
            var i = t.split(/\s/).filter(function(e) {
                return "" !== e
            });
            0 == i.length && logError("Spooky error! Empty line passed to rule function.", n);
            var l = 0,
                s = [],
                c = null,
                g = [],
                h = !1,
                u = !1,
                p = [],
                f = [],
                d = !1,
                v = !1,
                m = n,
                b = [],
                y = !1;
            if (1 === i.length) {
                if ("startloop" === i[0]) return D = {
                    bracket: 1
                };
                if ("endloop" === i[0]) return D = {
                    bracket: -1
                }
            }
            i.indexOf("->") == -1 && logError("A rule has to have an arrow in it. There's no arrow here! Consider reading up about rules - you're clearly doing something weird", n);
            for (var c = [], R = 0; R < i.length; R++) {
                var w = i[R];
                switch (l) {
                    case 0:
                        "+" === w ? m === n ? (0 == o.length && logError('The "+" symbol, for joining a rule with the group of the previous rule, needs a previous rule to be applied to.'), 0 !== R && logError('The "+" symbol, for joining a rule with the group of the previous rule, must be the first symbol on the line '), m = o[o.length - 1].groupNumber) : logError('Two "+"s ("append to previous rule group" symbol) applied to the same rule.', n) : w in directionaggregates ? s = s.concat(directionaggregates[w]) : "late" === w ? d = !0 : "rigid" === w ? v = !0 : "random" === w ? y = !0 : simpleAbsoluteDirections.indexOf(w) >= 0 ? s.push(w) : simpleRelativeDirections.indexOf(w) >= 0 ? logError('You cannot use relative directions ("^v<>") to indicate in which direction(s) a rule applies. Use absolute directions indicators (Up, Down, Left, Right, Horizontal, or Vertical, for instance), or, if you want the rule to apply in all four directions, do not specify directions', n) : "[" == w ? (0 == s.length && (s = s.concat(directionaggregates.orthogonal)), l = 1, R--) : logError("The start of a rule must consist of some number of directions (possibly 0), before the first bracket, specifying in what directions to look (with no direction specified, it applies in all four directions). It seems you've just entered \"" + w.toUpperCase() + '".', n);
                        break;
                    case 1:
                        if ("[" == w) c.length > 0 && logError('Error, malformed cell rule - encountered a "["" before previous bracket was closed', n), h = !0, c = [];
                        else if (reg_directions_only.exec(w)) c.length % 2 == 1 ? logError("Error, an item can only have one direction/action at a time, but you're looking for several at once!", n) : h ? c.push(w) : logWarning("Invalid syntax. Directions should be placed at the start of a rule.", n);
                        else if ("|" == w) c.length % 2 == 1 ? logError("In a rule, if you specify a force, it has to act on an object.", n) : (g.push(c), c = []);
                        else if ("]" === w) c.length % 2 == 1 ? "..." === c[0] ? logError("Cannot end a rule with ellipses.", n) : logError("In a rule, if you specify a force, it has to act on an object.", n) : (g.push(c), c = []), u ? f.push(g) : p.push(g), g = [], h = !1;
                        else if ("->" === w) u && logError('Error, you can only use "->" once in a rule; it\'s used to separate before and after states.', n), g.length > 0 ? logError('Encountered an unexpected "->" inside square brackets. It\'s used to separate states, it has no place inside them >:| .', n) : u = !0;
                        else if (r.names.indexOf(w) >= 0) h ? c.length % 2 == 0 ? (c.push(""), c.push(w)) : c.length % 2 == 1 && c.push(w) : logWarning("Invalid token " + w.toUpperCase() + ". Object names should only be used within cells (square brackets).", n);
                        else if ("..." === w) h ? (c.push(w), c.push(w)) : logWarning("Invalid syntax, ellipses should only be used within cells (square brackets).", n);
                        else if (commandwords.indexOf(w) >= 0)
                            if (u === !1 && logError("Commands cannot appear on the left-hand side of the arrow.", n), "message" === w) {
                                var E = findIndexAfterToken(a, i, R),
                                    k = a.substring(E).trim();
                                "" === k && (k = " "), b.push([w, k]), R = i.length
                            } else b.push([w]);
                        else logError('Error, malformed cell rule - was looking for cell contents, but found "' + w + '". What am I supposed to do with this, eh, please tell me that.', n)
                }
            }
            if (p.length != f.length) b.length > 0 && 0 == f.length || logError("Error, when specifying a rule, the number of matches (square bracketed bits) on the left hand side of the arrow must equal the number on the right", n);
            else
                for (var R = 0; R < p.length; R++) p[R].length != f[R].length && logError("In a rule, each pattern to match on the left must have a corresponding pattern on the right of equal length (number of cells).", n), 0 == p[R].length && logError("You have an totally empty pattern on the left-hand side. This will match *everything*. You certainly don't want this.");
            0 == p.length && logError("This rule refers to nothing. What the heck? :O", n);
            var D = {
                directions: s,
                lhs: p,
                rhs: f,
                lineNumber: n,
                late: d,
                rigid: v,
                groupNumber: m,
                commands: b,
                randomRule: y
            };
            directionalRule(D) === !1 && (D.directions = ["up"]);
            for (var R = 0; R < b.length; R++) {
                var _ = b[R][0];
                "restart" === _ ? (b.length > 1 || f.length > 0) && logError("The RESTART command can only appear by itself on the right hand side of the arrow.", n) : "cancel" === _ && (b.length > 1 || f.length > 0) && logError("The CANCEL command can only appear by itself on the right hand side of the arrow.", n)
            }
            return D
        }

        function deepCloneHS(e) {
            var r = e.map(function(e) {
                return e.map(function(e) {
                    return e.slice()
                })
            });
            return r
        }

        function deepCloneRule(e) {
            var r = {
                direction: e.direction,
                lhs: deepCloneHS(e.lhs),
                rhs: deepCloneHS(e.rhs),
                lineNumber: e.lineNumber,
                late: e.late,
                rigid: e.rigid,
                groupNumber: e.groupNumber,
                commands: e.commands,
                randomRule: e.randomRule
            };
            return r
        }

        function rulesToArray(e) {
            for (var r = e.rules, o = [], t = [], n = 0; n < r.length; n++) {
                var a = r[n][1],
                    i = processRuleString(r[n], e, o);
                void 0 === i.bracket ? o.push(i) : t.push([a, i.bracket])
            }
            e.loops = t;
            for (var l = [], n = 0; n < o.length; n++)
                for (var s = o[n], c = s.directions, g = 0; g < c.length; g++) {
                    var h = c[g];
                    if (h in directionaggregates && directionalRule(s))
                        for (var u = directionaggregates[h], p = 0; p < u.length; p++) {
                            var f = deepCloneRule(s);
                            f.direction = u[p], l.push(f)
                        } else {
                            var f = deepCloneRule(s);
                            f.direction = h, l.push(f)
                        }
                }
            for (var n = 0; n < l.length; n++) {
                var s = l[n];
                convertRelativeDirsToAbsolute(s), rewriteUpLeftRules(s), atomizeAggregates(e, s), rephraseSynonyms(e, s)
            }
            for (var d = [], n = 0; n < l.length; n++) {
                var s = l[n];
                d = d.concat(concretizeMovingRule(e, s, s.lineNumber))
            }
            for (var v = [], n = 0; n < d.length; n++) {
                var s = d[n];
                v = v.concat(concretizePropertyRule(e, s, s.lineNumber))
            }
            e.rules = v
        }

        function containsEllipsis(e) {
            for (var r = 0; r < e.lhs.length; r++)
                for (var o = 0; o < e.lhs[r].length; o++)
                    if ("..." === e.lhs[r][o][1]) return !0;
            return !1
        }

        function rewriteUpLeftRules(e) {
            if (!containsEllipsis(e)) {
                if ("up" == e.direction) e.direction = "down";
                else {
                    if ("left" != e.direction) return;
                    e.direction = "right"
                }
                for (var r = 0; r < e.lhs.length; r++) e.lhs[r].reverse(), e.rhs.length > 0 && e.rhs[r].reverse()
            }
        }

        function getPropertiesFromCell(e, r) {
            for (var o = [], t = 0; t < r.length; t += 2) {
                var n = r[t],
                    a = r[t + 1];
                "random" != n && a in e.propertiesDict && o.push(a)
            }
            return o
        }

        function getMovings(e, r) {
            for (var o = [], t = 0; t < r.length; t += 2) {
                var n = r[t],
                    a = r[t + 1];
                n in directionaggregates && o.push([a, n])
            }
            return o
        }

        function concretizePropertyInCell(e, r, o) {
            for (var t = 0; t < e.length; t += 2) e[t + 1] === r && "random" !== e[t] && (e[t + 1] = o)
        }

        function concretizeMovingInCell(e, r, o, t) {
            for (var n = 0; n < e.length; n += 2) e[n] === r && e[n + 1] === o && (e[n] = t)
        }

        function concretizeMovingInCellByAmbiguousMovementName(e, r, o) {
            for (var t = 0; t < e.length; t += 2) e[t] === r && (e[t] = o)
        }

        function expandNoPrefixedProperties(e, r) {
            for (var o = [], t = 0; t < r.length; t += 2) {
                var n = r[t],
                    a = r[t + 1];
                if ("no" === n && a in e.propertiesDict)
                    for (var i = e.propertiesDict[a], l = 0; l < i.length; l++) {
                        var s = i[l];
                        o.push(n), o.push(s)
                    } else o.push(n), o.push(a)
            }
            return o
        }

        function concretizePropertyRule(e, r, o) {
            for (var t = 0; t < r.lhs.length; t++)
                for (var n = r.lhs[t], a = 0; a < n.length; a++) n[a] = expandNoPrefixedProperties(e, n[a]), r.rhs.length > 0 && (r.rhs[t][a] = expandNoPrefixedProperties(e, r.rhs[t][a]));
            for (var i = {}, a = 0; a < r.rhs.length; a++)
                for (var l = r.lhs[a], s = r.rhs[a], c = 0; c < s.length; c++)
                    for (var g = getPropertiesFromCell(e, l[c]), h = getPropertiesFromCell(e, s[c]), u = 0; u < h.length; u++) {
                        var p = h[u];
                        g.indexOf(p) == -1 && (i[p] = !0)
                    }
            for (var f, d = [r], v = !0; v;) {
                v = !1;
                for (var t = 0; t < d.length; t++) {
                    var m = d[t];
                    f = !1;
                    for (var a = 0; a < m.lhs.length && !f; a++)
                        for (var b = m.lhs[a], c = 0; c < b.length && !f; c++)
                            for (var y = b[c], R = getPropertiesFromCell(e, y), u = 0; u < R.length; ++u) {
                                var p = R[u];
                                if (!e.propertiesSingleLayer.hasOwnProperty(p) || i[p] === !0) {
                                    var w = e.propertiesDict[p];
                                    f = !0, v = !0;
                                    for (var E = 0; E < w.length; E++) {
                                        var k = w[E],
                                            D = deepCloneRule(m);
                                        D.propertyReplacement = {};
                                        for (var _ in m.propertyReplacement)
                                            if (m.propertyReplacement.hasOwnProperty(_)) {
                                                var I = m.propertyReplacement[_];
                                                D.propertyReplacement[_] = [I[0], I[1]]
                                            }
                                        concretizePropertyInCell(D.lhs[a][c], p, k), D.rhs.length > 0 && concretizePropertyInCell(D.rhs[a][c], p, k), void 0 === D.propertyReplacement[p] ? D.propertyReplacement[p] = [k, 1] : D.propertyReplacement[p][1] = D.propertyReplacement[p][1] + 1, d.push(D)
                                    }
                                    break
                                }
                            }
                    f && (d.splice(t, 1), t--)
                }
            }
            for (var t = 0; t < d.length; t++) {
                var m = d[t];
                if (void 0 !== m.propertyReplacement)
                    for (var p in m.propertyReplacement)
                        if (m.propertyReplacement.hasOwnProperty(p)) {
                            var M = m.propertyReplacement[p],
                                k = M[0],
                                x = M[1];
                            if (1 === x)
                                for (var a = 0; a < m.rhs.length; a++)
                                    for (var j = m.rhs[a], c = 0; c < j.length; c++) {
                                        var N = j[c];
                                        concretizePropertyInCell(N, p, k)
                                    }
                        }
            }
            for (var C = "", t = 0; t < d.length; t++) {
                var m = d[t];
                delete d.propertyReplacement;
                for (var a = 0; a < m.rhs.length; a++)
                    for (var b = m.rhs[a], c = 0; c < b.length; c++)
                        for (var y = b[c], R = getPropertiesFromCell(e, y), u = 0; u < R.length; u++) i.hasOwnProperty(R[u]) && (C = R[u])
            }
            return C.length > 0 && logError('This rule has a property on the right-hand side, "' + C.toUpperCase() + "\", that can't be inferred from the left-hand side. (either for every property on the right there has to be a corresponding one on the left in the same cell, OR, if there's a single occurrence of a particular property name on the left, all properties of the same name on the right are assumed to be the same).", o), d
        }

        function concretizeMovingRule(e, r, o) {
            for (var t, n = [r], a = !0; a;) {
                a = !1;
                for (var i = 0; i < n.length; i++) {
                    var l = n[i];
                    t = !1;
                    for (var s = 0; s < l.lhs.length; s++)
                        for (var c = l.lhs[s], g = 0; g < c.length; g++) {
                            var h = c[g],
                                u = getMovings(e, h);
                            if (u.length > 0) {
                                t = !0, a = !0;
                                for (var p = u[0][0], f = u[0][1], d = directionaggregates[f], v = 0; v < d.length; v++) {
                                    var m = d[v],
                                        b = deepCloneRule(l);
                                    b.movingReplacement = {};
                                    for (var y in l.movingReplacement)
                                        if (l.movingReplacement.hasOwnProperty(y)) {
                                            var R = l.movingReplacement[y];
                                            b.movingReplacement[y] = [R[0], R[1], R[2]]
                                        }
                                    concretizeMovingInCell(b.lhs[s][g], f, p, m), b.rhs.length > 0 && concretizeMovingInCell(b.rhs[s][g], f, p, m), void 0 === b.movingReplacement[p] ? b.movingReplacement[p] = [m, 1, f] : b.movingReplacement[p][1] = b.movingReplacement[p][1] + 1, n.push(b)
                                }
                            }
                        }
                    t && (n.splice(i, 1), i--)
                }
            }
            for (var i = 0; i < n.length; i++) {
                var l = n[i];
                if (void 0 !== l.movingReplacement) {
                    var w = {};
                    for (var p in l.movingReplacement)
                        if (l.movingReplacement.hasOwnProperty(p)) {
                            var E = l.movingReplacement[p],
                                k = E[0],
                                D = E[1],
                                _ = E[2];
                            if (_ in w || 1 !== D ? w[_] = "INVALID" : w[_] = k, 1 === D)
                                for (var s = 0; s < l.rhs.length; s++)
                                    for (var I = l.rhs[s], g = 0; g < I.length; g++) {
                                        var M = I[g];
                                        concretizeMovingInCell(M, _, p, k)
                                    }
                        }
                    for (var _ in w)
                        if (w.hasOwnProperty(_) && "INVALID" !== _) {
                            if (k = w[_], "INVALID" === k) continue;
                            for (var s = 0; s < l.rhs.length; s++)
                                for (var I = l.rhs[s], g = 0; g < I.length; g++) {
                                    var M = I[g];
                                    concretizeMovingInCellByAmbiguousMovementName(M, _, k)
                                }
                        }
                }
            }
            for (var x = "", i = 0; i < n.length; i++) {
                var l = n[i];
                delete n.movingReplacement;
                for (var s = 0; s < l.rhs.length; s++)
                    for (var c = l.rhs[s], g = 0; g < c.length; g++) {
                        var h = c[g],
                            u = getMovings(e, h);
                        u.length > 0 && (x = u[0][1])
                    }
            }
            return x.length > 0 && logError('This rule has an ambiguous movement on the right-hand side, "' + x + "\", that can't be inferred from the left-hand side. (either for every ambiguous movement associated to an entity on the right there has to be a corresponding one on the left attached to the same entity, OR, if there's a single occurrence of a particular ambiguous movement on the left, all properties of the same movement attached to the same object on the right are assumed to be the same (or something like that)).", o), n
        }

        function rephraseSynonyms(e, r) {
            for (var o = 0; o < r.lhs.length; o++)
                for (var t = r.lhs[o], n = r.rhs[o], a = 0; a < t.length; a++) {
                    for (var i = t[a], l = 1; l < i.length; l += 2) {
                        var s = i[l];
                        s in e.synonymsDict && (i[l] = e.synonymsDict[i[l]])
                    }
                    if (r.rhs.length > 0)
                        for (var c = n[a], l = 1; l < c.length; l += 2) {
                            var s = c[l];
                            s in e.synonymsDict && (c[l] = e.synonymsDict[c[l]])
                        }
                }
        }

        function atomizeAggregates(e, r) {
            for (var o = 0; o < r.lhs.length; o++)
                for (var t = r.lhs[o], n = 0; n < t.length; n++) {
                    var a = t[n];
                    atomizeCellAggregates(e, a, r.lineNumber)
                }
            for (var o = 0; o < r.rhs.length; o++)
                for (var t = r.rhs[o], n = 0; n < t.length; n++) {
                    var a = t[n];
                    atomizeCellAggregates(e, a, r.lineNumber)
                }
        }

        function atomizeCellAggregates(e, r, o) {
            for (var t = 0; t < r.length; t += 2) {
                var n = r[t],
                    a = r[t + 1];
                if (a in e.aggregatesDict) {
                    "no" === n && logError("You cannot use 'no' to exclude the aggregate object " + a.toUpperCase() + " (defined using 'AND'), only regular objects, or properties (objects defined using 'OR'). If you want to do this, you'll have to write it out yourself the long way.", o);
                    var i = e.aggregatesDict[a];
                    r[t + 1] = i[0];
                    for (var l = 1; l < i.length; l++) r.push(r[t]), r.push(i[l])
                }
            }
        }

        function convertRelativeDirsToAbsolute(e) {
            for (var r = e.direction, o = 0; o < e.lhs.length; o++)
                for (var t = e.lhs[o], n = 0; n < t.length; n++) {
                    var a = t[n];
                    absolutifyRuleCell(r, a)
                }
            for (var o = 0; o < e.rhs.length; o++)
                for (var t = e.rhs[o], n = 0; n < t.length; n++) {
                    var a = t[n];
                    absolutifyRuleCell(r, a)
                }
        }

        function absolutifyRuleCell(e, r) {
            for (var o = 0; o < r.length; o += 2) {
                var t = r[o],
                    n = relativeDirs.indexOf(t);
                n >= 0 && (r[o] = relativeDict[e][n])
            }
        }

        function rulesToMask(e) {
            for (var r = e.collisionLayers.length, o = [], t = 0; t < r; t++) o.push(null);
            for (var t = 0; t < e.rules.length; t++)
                for (var n = e.rules[t], a = 0; a < n.lhs.length; a++)
                    for (var i = n.lhs[a], l = n.rhs[a], s = 0; s < i.length; s++) {
                        for (var c = i[s], g = o.concat([]), h = new BitVec(STRIDE_OBJ), u = new BitVec(STRIDE_OBJ), p = [], f = new BitVec(STRIDE_MOV), d = new BitVec(STRIDE_MOV), v = new BitVec(STRIDE_MOV), m = 0; m < c.length; m += 2) {
                            var b = c[m];
                            if ("..." === b) {
                                if (h = ellipsisPattern, 2 !== c.length) logError("You can't have anything in with an ellipsis. Sorry.", n.lineNumber);
                                else if (0 === s || s === i.length - 1) logError("There's no point in putting an ellipsis at the very start or the end of a rule", n.lineNumber);
                                else if (n.rhs.length > 0) {
                                    var y = l[s];
                                    2 === y.length && "..." === y[0] || logError("An ellipsis on the left must be matched by one in the corresponding place on the right.", n.lineNumber)
                                }
                                break
                            }
                            if ("random" !== b) {
                                var R = c[m + 1],
                                    w = e.objects[R],
                                    E = e.objectMasks[R];
                                if (w) var k = 0 | w.layer;
                                else var k = e.propertiesSingleLayer[R];
                                if ("undefined" == typeof k && logError("Oops! " + R.toUpperCase() + " not assigned to a layer.", n.lineNumber), "no" === b) u.ior(E);
                                else {
                                    var D = g[k];
                                    null !== D && logError("Rule matches object types that can't overlap: \"" + R.toUpperCase() + '" and "' + D.toUpperCase() + '".', n.lineNumber), g[k] = R, w ? (h.ior(E), v.ishiftor(31, 5 * k)) : p.push(E), "stationary" === b ? d.ishiftor(31, 5 * k) : f.ishiftor(dirMasks[b], 5 * k)
                                }
                            } else logError("'random' cannot be matched on the left-hand side, it can only appear on the right", n.lineNumber)
                        }
                        if (n.rhs.length > 0) {
                            var y = l[s],
                                _ = i[s];
                            "..." === y[0] && "..." !== _[0] && logError("An ellipsis on the right must be matched by one in the corresponding place on the left.", n.lineNumber);
                            for (var m = 0; m < y.length; m += 2) {
                                var I = y[m];
                                "..." === I && 2 !== y.length && logError("You can't have anything in with an ellipsis. Sorry.", n.lineNumber)
                            }
                        }
                        if (h !== ellipsisPattern) {
                            if (i[s] = new CellPattern([h, u, p, f, d, null]), 0 !== n.rhs.length) {
                                for (var M = l[s], x = o.concat([]), j = o.concat([]), N = new BitVec(STRIDE_OBJ), C = new BitVec(STRIDE_OBJ), O = new BitVec(STRIDE_MOV), S = new BitVec(STRIDE_MOV), T = new BitVec(STRIDE_MOV), P = new BitVec(STRIDE_OBJ), L = new BitVec(STRIDE_MOV), A = new BitVec(STRIDE_MOV), m = 0; m < M.length; m += 2) {
                                    var b = M[m],
                                        R = M[m + 1];
                                    if ("..." === b) break;
                                    if ("random" !== b) {
                                        var w = e.objects[R],
                                            E = e.objectMasks[R];
                                        if (w) var k = 0 | w.layer;
                                        else var k = e.propertiesSingleLayer[R];
                                        if ("no" == b) N.ior(E);
                                        else {
                                            var D = x[k];
                                            null === D && (D = j[k]), null !== D && logError("Rule matches object types that can't overlap: \"" + R.toUpperCase() + '" and "' + D.toUpperCase() + '".', n.lineNumber), x[k] = R, b.length > 0 && L.ishiftor(31, 5 * k);
                                            var B = e.layerMasks[k];
                                            w && (C.ibitset(w.id), N.ior(B), T.ishiftor(31, 5 * k)), "stationary" === b && O.ishiftor(31, 5 * k), "randomdir" === b ? A.ishiftor(dirMasks[b], 5 * k) : S.ishiftor(dirMasks[b], 5 * k)
                                        }
                                    } else if (R in e.objectMasks) {
                                        var V = e.objectMasks[R];
                                        P.ior(V);
                                        var z;
                                        z = e.propertiesDict.hasOwnProperty(R) ? e.propertiesDict[R] : [R];
                                        for (var U = 0; U < z.length; U++) {
                                            var F = z[U],
                                                k = 0 | e.objects[F].layer,
                                                D = x[k];
                                            if (null !== D) {
                                                var J = F.toUpperCase(),
                                                    W = D.toUpperCase();
                                                J !== W && logWarning("This rule may try to spawn a " + J + " with random, but also requires a " + W + " be here, which is on the same layer - they shouldn't be able to coexist!", n.lineNumber)
                                            }
                                            j[k] = F
                                        }
                                    } else logError('You want to spawn a random "' + R.toUpperCase() + "\", but I don't know how to do that", n.lineNumber)
                                }
                                h.bitsSetInArray(C.data) || N.ior(h), f.bitsSetInArray(S.data) || O.ior(f);
                                for (var m = 0; m < r; m++) null !== g[m] && null === x[m] && (N.ior(e.layerMasks[m]), L.ishiftor(31, 5 * m));
                                v.iclear(T), L.ior(v), (N || C || O || S || L) && (i[s].replacement = new CellReplacement([N, C, O, S, L, P, A]))
                            }
                        } else i[s] = ellipsisPattern
                    }
        }

        function cellRowMasks(e) {
            for (var r = [], o = e[1], t = 0; t < o.length; t++) {
                for (var n = o[t], a = new BitVec(STRIDE_OBJ), i = 0; i < n.length; i++) n[i] !== ellipsisPattern && a.ior(n[i].objectsPresent);
                r.push(a)
            }
            return r
        }

        function collapseRules(e) {
            for (var r = 0; r < e.length; r++)
                for (var o = e[r], t = 0; t < o.length; t++) {
                    for (var n = o[t], a = [0, [], n.rhs.length > 0, n.lineNumber], i = [], l = 0; l < n.lhs.length; l++) i.push(!1);
                    a[0] = dirMasks[n.direction];
                    for (var l = 0; l < n.lhs.length; l++) {
                        for (var s = n.lhs[l], c = 0; c < s.length; c++) s[c] === ellipsisPattern && (i[l] && logError("You can't use two ellipses in a single cell match pattern. If you really want to, please implement it yourself and send me a patch :) ", n.lineNumber), i[l] = !0);
                        a[1][l] = s
                    }
                    a.push(i), a.push(n.groupNumber), a.push(n.rigid), a.push(n.commands), a.push(n.randomRule), a.push(cellRowMasks(a)), o[t] = new Rule(a)
                }
            matchCache = {}
        }

        function ruleGroupRandomnessTest(e) {
            if (0 !== e.length)
                for (var r = e[0].lineNumber, o = 1; o < e.length; o++) {
                    var t = e[o];
                    t.lineNumber !== r && t.randomRule && logError("A rule-group can only be marked random by the first rule", t.lineNumber)
                }
        }

        function arrangeRulesByGroupNumber(e) {
            for (var r = {}, o = {}, t = 0; t < e.rules.length; t++) {
                var n = e.rules[t],
                    a = r;
                n.late && (a = o), void 0 == a[n.groupNumber] && (a[n.groupNumber] = []), a[n.groupNumber].push(n)
            }
            var i = [];
            for (var l in r)
                if (r.hasOwnProperty(l)) {
                    var s = r[l];
                    ruleGroupRandomnessTest(s), i.push(s)
                }
            var c = [];
            for (var l in o)
                if (o.hasOwnProperty(l)) {
                    var s = o[l];
                    ruleGroupRandomnessTest(s), c.push(s)
                }
            e.rules = i, e.lateRules = c
        }

        function checkNoLateRulesHaveMoves(e) {
            for (var r = 0; r < e.lateRules.length; r++)
                for (var o = e.lateRules[r], t = 0; t < o.length; t++)
                    for (var n = o[t], a = 0; a < n.patterns.length; a++)
                        for (var i = n.patterns[a], l = 0; l < i.length; l++) {
                            var s = i[l];
                            if (s !== ellipsisPattern) {
                                var c = s.movementsMissing,
                                    g = s.movementsPresent;
                                if (!c.iszero() || !g.iszero()) return void logError("Movements cannot appear in late rules.", n.lineNumber);
                                if (null != s.replacement) {
                                    var h = s.replacement.movementsClear,
                                        u = s.replacement.movementsSet;
                                    if (!h.iszero() || !u.iszero()) return void logError("Movements cannot appear in late rules.", n.lineNumber)
                                }
                            }
                        }
        }

        function generateRigidGroupList(e) {
            for (var r = [], o = [], t = [], n = [], a = [], i = 0; i < e.rules.length; i++) {
                for (var l = e.rules[i], s = !1, c = 0; c < l.length; c++) {
                    var g = l[c];
                    g.isRigid && (s = !0)
                }
                if (a[i] = s, s) {
                    var h = l[0].groupNumber;
                    t[h] = i;
                    var u = r.length;
                    o[i] = u, n[h] = u, r.push(i)
                }
            }
            r.length > 30 && logError("There can't be more than 30 rigid groups (rule groups containing rigid members).", rules[0][0][3]), e.rigidGroups = a, e.rigidGroupIndex_to_GroupIndex = r, e.groupNumber_to_RigidGroupIndex = n, e.groupIndex_to_RigidGroupIndex = o
        }

        function getMaskFromName(e, r) {
            var o = new BitVec(STRIDE_OBJ);
            if (r in e.objects) {
                var t = e.objects[r];
                o.ibitset(t.id)
            }
            if (r in e.aggregatesDict)
                for (var n = e.aggregatesDict[r], a = 0; a < n.length; a++) {
                    var i = n[a],
                        t = e.objects[i];
                    o.ibitset(t.id)
                }
            if (r in e.propertiesDict)
                for (var n = e.propertiesDict[r], a = 0; a < n.length; a++) {
                    var i = n[a],
                        t = e.objects[i];
                    o.ibitset(t.id)
                }
            if (r in e.synonymsDict) {
                var i = e.synonymsDict[r],
                    t = e.objects[i];
                o.ibitset(t.id)
            }
            return o.iszero() && logErrorNoLine("error, didn't find any object called player, either in the objects section, or the legends section. there must be a player!"), o
        }

        function generateMasks(e) {
            e.playerMask = getMaskFromName(e, "player");
            for (var r = [], o = e.collisionLayers.length, t = 0; t < o; t++) {
                for (var n = new BitVec(STRIDE_OBJ), a = 0; a < e.objectCount; a++) {
                    var i = e.idDict[a],
                        l = e.objects[i];
                    l.layer == t && n.ibitset(l.id)
                }
                r.push(n)
            }
            e.layerMasks = r;
            var s = {};
            for (var i in e.objects)
                if (e.objects.hasOwnProperty(i)) {
                    var l = e.objects[i];
                    s[i] = new BitVec(STRIDE_OBJ), s[i].ibitset(l.id)
                }
            var c = e.legend_synonyms.concat(e.legend_properties);
            c.sort(function(e, r) {
                return e.lineNumber - r.lineNumber
            });
            for (var g = 0; g < c.length; g++) {
                var h = c[g];
                if (2 == h.length) s[h[0]] = s[h[1]];
                else {
                    for (var u = new BitVec(STRIDE_OBJ), a = 1; a < h.length; a++) {
                        var i = h[a];
                        u.ior(s[i])
                    }
                    s[h[0]] = u
                }
            }
            e.objectMasks = s
        }

        function checkObjectsAreLayered(e) {
            for (var r in e.objects)
                if (e.objects.hasOwnProperty(r)) {
                    for (var o = !1, t = 0; t < e.collisionLayers.length; t++) {
                        for (var n = e.collisionLayers[t], a = 0; a < n.length; a++)
                            if (n[a] === r) {
                                o = !0;
                                break
                            }
                        if (o) break
                    }
                    if (o === !1) {
                        var i = e.objects[r];
                        logError('Object "' + r.toUpperCase() + '" has been defined, but not assigned to a layer.', i.lineNumber)
                    }
                }
        }

        function twiddleMetaData(e) {
            for (var r = {}, o = 0; o < e.metadata.length; o += 2) {
                var t = e.metadata[o],
                    n = e.metadata[o + 1];
                r[t] = n
            }
            if (void 0 !== r.flickscreen) {
                var n = r.flickscreen,
                    a = n.split("x"),
                    i = [parseInt(a[0]), parseInt(a[1])];
                r.flickscreen = i
            }
            if (void 0 !== r.zoomscreen) {
                var n = r.zoomscreen,
                    a = n.split("x"),
                    i = [parseInt(a[0]), parseInt(a[1])];
                r.zoomscreen = i
            }
            e.metadata = r
        }

        function processWinConditions(e) {
            for (var r = [], o = 0; o < e.winconditions.length; o++) {
                var t = e.winconditions[o];
                if (0 == t.length) return;
                var n = 0;
                switch (t[0]) {
                    case "no":
                        n = -1;
                        break;
                    case "all":
                        n = 1
                }
                var a, i = t[t.length - 1],
                    l = t[1];
                a = 5 == t.length ? t[3] : "background";
                var s = 0,
                    c = 0;
                l in e.objectMasks ? s = e.objectMasks[l] : logError('unwelcome term "' + l + '" found in win condition. Win conditions objects have to be objects or properties (defined using "or", in terms of other properties)', i), a in e.objectMasks ? c = e.objectMasks[a] : logError('unwelcome term "' + a + '" found in win condition. Win conditions objects have to be objects or properties (defined using "or", in terms of other properties)', i);
                var g = [n, s, c, i];
                r.push(g)
            }
            e.winconditions = r
        }

        function printCellRow(e) {
            for (var r = "[ ", o = 0; o < e.length; o++) {
                o > 0 && (r += "| ");
                for (var t = e[o], n = 0; n < t.length; n += 2) {
                    var a = t[n],
                        i = t[n + 1];
                    r += "..." === a ? a + " " : a + " " + i + " "
                }
            }
            return r += "] "
        }

        function printRule(e) {
            var r = "(<a onclick=\"jumpToLine('" + e.lineNumber.toString() + '\');" href="javascript:void(0);">' + e.lineNumber + "</a>) " + e.direction.toString().toUpperCase() + " ";
            e.rigid && (r = "RIGID " + r + " "), e.randomRule && (r = "RANDOM " + r + " "), e.late && (r = "LATE " + r + " ");
            for (var o = 0; o < e.lhs.length; o++) {
                var t = e.lhs[o];
                r += printCellRow(t)
            }
            r += "-> ";
            for (var o = 0; o < e.rhs.length; o++) {
                var t = e.rhs[o];
                r += printCellRow(t)
            }
            for (var o = 0; o < e.commands.length; o++) {
                var n = e.commands[o];
                1 === n.length ? r += n[0].toString() : r = r + "(" + n[0].toString() + ", " + n[1].toString() + ") "
            }
            return r
        }

        function printRules(e) {
            for (var r = "<br>Rule Assembly : (" + e.rules.length + " rules )<br>===========<br>", o = 0, t = -1, n = 0; n < e.rules.length; n++) {
                var a = e.rules[n];
                o < e.loops.length && e.loops[o][0] < a.lineNumber && (r += "STARTLOOP<br>", o++, o < e.loops.length && (t = e.loops[o][0], o++)), t !== -1 && t < a.lineNumber && (r += "ENDLOOP<br>", t = -1), r += printRule(a) + "<br>"
            }
            t !== -1 && (r += "ENDLOOP<br>"), r += "===========<br>", consolePrint(r)
        }

        function removeDuplicateRules(e) {
            for (var r = {}, o = -1, t = e.rules.length - 1; t >= 0; t--) {
                var n = e.rules[t],
                    a = n.groupNumber;
                a !== o && (r = {});
                var i = printRule(n);
                r.hasOwnProperty(i) ? e.rules.splice(t, 1) : r[i] = !0, o = a
            }
        }

        function generateLoopPoints(e) {
            var r = {},
                o = !0,
                t = 0,
                n = 0;
            e.loops.length % 2 === 1 && logErrorNoLine("have to have matching number of 'startLoop' and 'endLoop' loop points.");
            for (var a = 0; a < e.loops.length; a++)
                for (var i = e.loops[a], l = 0; l < e.rules.length; l++) {
                    var s = e.rules[l],
                        c = s[0],
                        g = s[s.length - 1],
                        h = c.lineNumber;
                    g.lineNumber;
                    if (o) {
                        if (h >= i[0]) {
                            n = l, o = !1, i[1] === -1 && logErrorNoLine("Need have to have matching number of 'startLoop' and 'endLoop' loop points.");
                            break
                        }
                    } else if (h >= i[0]) {
                        t = l - 1, r[t] = n, o = !0, 1 === i[1] && logErrorNoLine("Need have to have matching number of 'startLoop' and 'endLoop' loop points.");
                        break
                    }
                }
            if (o === !1) {
                var t = e.rules.length;
                r[t] = n
            }
            e.loopPoint = r, r = {}, o = !0;
            for (var a = 0; a < e.loops.length; a++)
                for (var i = e.loops[a], l = 0; l < e.lateRules.length; l++) {
                    var s = e.lateRules[l],
                        c = s[0],
                        g = s[s.length - 1],
                        h = c.lineNumber;
                    g.lineNumber;
                    if (o) {
                        if (h >= i[0]) {
                            n = l, o = !1, i[1] === -1 && logErrorNoLine("Need have to have matching number of 'startLoop' and 'endLoop' loop points.");
                            break
                        }
                    } else if (h >= i[0]) {
                        t = l - 1, r[t] = n, o = !0, 1 === i[1] && logErrorNoLine("Need have to have matching number of 'startLoop' and 'endLoop' loop points.");
                        break
                    }
                }
            if (o === !1) {
                var t = e.lateRules.length;
                r[t] = n
            }
            e.lateLoopPoint = r
        }

        function validSeed(e) {
            return null !== /^\s*\d+\s*$/.exec(e)
        }

        function generateSoundData(e) {
            for (var r = {}, o = [], t = [], n = [], a = [], i = 0; i < e.sounds.length; i++) {
                var l = e.sounds[i];
                if (!(l.length <= 1)) {
                    var s = l[l.length - 1];
                    if (2 !== l.length)
                        if (soundEvents.indexOf(l[0]) >= 0) {
                            l.length > 4 && logError("too much stuff to define a sound event.", s);
                            var c = l[1];
                            validSeed(c) ? (void 0 !== r[l[0]] && logWarning(l[0].toUpperCase() + " already declared.", s), r[l[0]] = l[1]) : logError('Expecting sfx data, instead found "' + l[1] + '".', s)
                        } else {
                            var g = l[0].trim(),
                                h = l[1].trim(),
                                u = l.slice(2, l.length - 2);
                            u.length > 0 && "move" !== h && "cantmove" !== h && logError("incorrect sound declaration.", s), "action" === h && (h = "move", u = ["___action____"]), 0 == u.length && (u = ["orthogonal"]);
                            var c = l[l.length - 2];
                            g in e.aggregatesDict ? logError('cannot assign sound events to aggregate objects (declared with "and"), only to regular objects, or properties, things defined in terms of "or" ("' + g + '").', s) : g in e.objectMasks || logError('Object "' + g + '" not found.', s);
                            for (var p = e.objectMasks[g], f = 0, d = 0; d < u.length; d++) {
                                u[d] = u[d].trim();
                                var v = u[d];
                                if (soundDirectionIndicators.indexOf(v) === -1) logError('Was expecting a direction, instead found "' + v + '".', s);
                                else {
                                    var m = soundDirectionIndicatorMasks[v];
                                    f |= m
                                }
                            }
                            for (var b = [g], y = !0; y;) {
                                y = !1;
                                for (var R = 0; R < b.length; R++) {
                                    var w = b[R];
                                    if (w in e.synonymsDict) b[R] = e.synonymsDict[w], y = !0;
                                    else if (w in e.propertiesDict) {
                                        y = !0;
                                        var E = e.propertiesDict[w];
                                        b.splice(R, 1), R--;
                                        for (var k = 0; k < E.length; k++) b.push(E[k])
                                    }
                                }
                            }
                            if ("move" === h || "cantmove" === h)
                                for (var d = 0; d < b.length; d++) {
                                    var D = b[d],
                                        _ = e.objects[D],
                                        I = _.layer,
                                        M = new BitVec(STRIDE_MOV);
                                    M.ishiftor(f, 5 * I);
                                    var x = {
                                        objectMask: p,
                                        directionMask: M,
                                        seed: c
                                    };
                                    "move" === h ? n.push(x) : a.push(x)
                                }
                            validSeed(c) || logError('Expecting sfx data, instead found "' + c + '".', s);
                            switch (h) {
                                case "create":
                                    var x = {
                                        objectMask: p,
                                        seed: c
                                    };
                                    o.push(x);
                                    break;
                                case "destroy":
                                    var x = {
                                        objectMask: p,
                                        seed: c
                                    };
                                    t.push(x)
                            }
                        } else logError("incorrect sound declaration.", s)
                }
            }
            e.sfx_Events = r, e.sfx_CreationMasks = o, e.sfx_DestructionMasks = t, e.sfx_MovementMasks = n, e.sfx_MovementFailureMasks = a
        }

        function formatHomePage(e) {
            if ("background_color" in e.metadata ? e.bgcolor = colorToHex(colorPalette, e.metadata.background_color) : e.bgcolor = "#000000", "text_color" in e.metadata ? e.fgcolor = colorToHex(colorPalette, e.metadata.text_color) : e.fgcolor = "#FFFFFF", isColor(e.fgcolor) === !1 && logError("text_color in incorrect format - found " + e.fgcolor + ", but I expect a color name (like 'pink') or hex-formatted color (like '#1412FA')."), isColor(e.bgcolor) === !1 && logError("background_color in incorrect format - found " + e.bgcolor + ", but I expect a color name (like 'pink') or hex-formatted color (like '#1412FA')."), canSetHTMLColors && ("background_color" in e.metadata && (document.body.style.backgroundColor = e.bgcolor), "text_color" in e.metadata)) {
                var r = document.getElementById("separator");
                null != r && (r.style.color = e.fgcolor);
                for (var o = document.getElementsByTagName("a"), t = 0; t < o.length; t++) o[t].style.color = e.fgcolor;
                for (var o = document.getElementsByTagName("h1"), t = 0; t < o.length; t++) o[t].style.color = e.fgcolor
            }
            if ("homepage" in e.metadata) {
                var n = e.metadata.homepage;
                n = n.replace("http://", ""), n = n.replace("https://", ""), e.metadata.homepage = n
            }
        }

        function loadFile(e) {
            for (var r = new codeMirrorFn, o = r.startState(), t = e.split("\n"), n = 0; n < t.length; n++) {
                var a = t[n];
                o.lineNumber = n + 1;
                var i = new CodeMirror.StringStream(a, 4);
                do
                    if (r.token(i, o), errorCount > MAX_ERRORS) return void consolePrint("too many errors, aborting compilation");
                while (i.eol() === !1)
            }
            return delete o.lineNumber, generateExtraMembers(o), generateMasks(o), levelsToArray(o), rulesToArray(o), removeDuplicateRules(o), debugMode && printRules(o), rulesToMask(o), arrangeRulesByGroupNumber(o), collapseRules(o.rules), collapseRules(o.lateRules), checkNoLateRulesHaveMoves(o), generateRigidGroupList(o), processWinConditions(o), checkObjectsAreLayered(o), twiddleMetaData(o), generateLoopPoints(o), generateSoundData(o), formatHomePage(o), delete o.commentLevel, delete o.names, delete o.abbrevNames, delete o.objects_candname, delete o.objects_section, delete o.objects_spritematrix, delete o.section, delete o.subsection, delete o.tokenIndex, delete o.visitedSections, delete o.loops, o
        }

        function compile(e, r, o) {
            if (matchCache = {}, forceRegenImages = !0, void 0 === e && (e = ["restart"]), void 0 === o && (o = null), lastDownTarget = canvas, void 0 === r) {
                var t = window.form1.code,
                    n = t.editorreference;
                r = n.getValue() + "\n"
            }
            canDump === !0 && (compiledText = r), errorCount = 0, compiling = !0, errorStrings = [], consolePrint("=================================");
            try {
                var a = loadFile(r)
            } finally {
                compiling = !1
            }
            if (a && a.levels && 0 === a.levels.length && logError("No levels found. Add some levels!", void 0, !0), !(errorCount > MAX_ERRORS)) {
                if (errorCount > 0) consoleError('<span class="systemMessage">Errors detected during compilation, the game may not work correctly.</span>');
                else {
                    for (var i = 0, l = 0; l < a.rules.length; l++) i += a.rules[l].length;
                    for (var l = 0; l < a.lateRules.length; l++) i += a.lateRules[l].length;
                    "restart" == e[0] ? consolePrint('<span class="systemMessage">Successful Compilation, generated ' + i + " instructions.</span>") : consolePrint('<span class="systemMessage">Successful live recompilation, generated ' + i + " instructions.</span>")
                }
                setGameState(a, e, o), clearInputHistory(), consoleCacheDump()
            }
        }

        function qualifyURL(e) {
            var r = document.createElement("a");
            return r.href = e, r.href
        }
        var debugMode, colorPalette;
        Level.prototype.calcBackgroundMask = function(e) {
            void 0 === e.backgroundlayer && logError("you have to have a background layer");
            for (var r = e.layerMasks[e.backgroundlayer], o = 0; o < this.n_tiles; o++) {
                var t = this.getCell(o);
                if (t.iand(r), !t.iszero()) return t
            }
            return t = new BitVec(STRIDE_OBJ), t.ibitset(e.backgroundid), t
        };
        var directionaggregates = {
                horizontal: ["left", "right"],
                vertical: ["up", "down"],
                moving: ["up", "down", "left", "right", "action"],
                orthogonal: ["up", "down", "left", "right"],
                perpendicular: ["^", "v"],
                parallel: ["<", ">"]
            },
            relativeDirections = ["^", "v", "<", ">", "horizontal", "vertical"],
            simpleAbsoluteDirections = ["up", "down", "left", "right"],
            simpleRelativeDirections = ["^", "v", "<", ">"],
            reg_directions_only = /^(\>|\<|\^|v|up|down|left|right|moving|stationary|no|randomdir|random|horizontal|vertical|orthogonal|perpendicular|parallel|action)$/,
            commandwords = ["sfx0", "sfx1", "sfx2", "sfx3", "sfx4", "sfx5", "sfx6", "sfx7", "sfx8", "sfx9", "sfx10", "cancel", "checkpoint", "restart", "win", "message", "again"],
            relativeDirs = ["^", "v", "<", ">", "parallel", "perpendicular"],
            relativeDict = {
                right: ["up", "down", "left", "right", "horizontal", "vertical"],
                up: ["left", "right", "down", "up", "vertical", "horizontal"],
                down: ["right", "left", "up", "down", "vertical", "horizontal"],
                left: ["down", "up", "right", "left", "horizontal", "vertical"]
            },
            dirMasks = {
                up: parseInt("00001", 2),
                down: parseInt("00010", 2),
                left: parseInt("00100", 2),
                right: parseInt("01000", 2),
                moving: parseInt("01111", 2),
                no: parseInt("00011", 2),
                randomdir: parseInt("00101", 2),
                random: parseInt("10010", 2),
                action: parseInt("10000", 2),
                "": parseInt("00000", 2)
            },
            soundEvents = ["titlescreen", "startgame", "cancel", "endgame", "startlevel", "undo", "restart", "endlevel", "showmessage", "closemessage", "sfx0", "sfx1", "sfx2", "sfx3", "sfx4", "sfx5", "sfx6", "sfx7", "sfx8", "sfx9", "sfx10"],
            soundMaskedEvents = ["create", "destroy", "move", "cantmove", "action"],
            soundVerbs = soundEvents.concat(soundMaskedEvents),
            soundDirectionIndicatorMasks = {
                up: parseInt("00001", 2),
                down: parseInt("00010", 2),
                left: parseInt("00100", 2),
                right: parseInt("01000", 2),
                horizontal: parseInt("01100", 2),
                vertical: parseInt("00011", 2),
                orthogonal: parseInt("01111", 2),
                ___action____: parseInt("10000", 2)
            },
            soundDirectionIndicators = ["up", "down", "left", "right", "horizontal", "vertical", "orthogonal", "___action____"],
            MAX_ERRORS = 5,
            ifrm;
    
        function selectText(e, t) {
            t = t || window.event;
            var o = document.getElementById(e);
            if (t && (t.ctrlKey || t.metaKey)) {
                var r = ["console"].concat(o.innerHTML.split("<br>")),
                    l = levelFromString(state, r);
                loadLevelFromLevelDat(state, l, null), canvasResize()
            } else if (document.selection) {
                var n = document.body.createTextRange();
                n.moveToElementText(o), n.select()
            } else if (window.getSelection) {
                var n = document.createRange();
                n.selectNode(o), window.getSelection().addRange(n)
            }
        }

        function recalcLevelBounds() {}

        function arrCopy(e, t, o, r, l) {
            for (; l--;) o[r++] = e[t]++
        }

        function adjustLevel(e, t, o) {
            backups.push(backupLevel());
            var r = e.clone();
            e.width += t, e.height += o, e.n_tiles = e.width * e.height, e.objects = new Int32Array(e.n_tiles * STRIDE_OBJ);
            var l = new BitVec(STRIDE_OBJ);
            l.ibitset(state.backgroundid);
            for (var n = 0; n < e.n_tiles; ++n) e.setCell(n, l);
            return e.movements = new Int32Array(e.objects.length), columnAdded = !0, RebuildLevelArrays(), r
        }

        function addLeftColumn() {
            for (var e = adjustLevel(level, 1, 0), t = 1; t < level.width; ++t)
                for (var o = 0; o < level.height; ++o) {
                    var r = t * level.height + o;
                    level.setCell(r, e.getCell(r - level.height))
                }
        }

        function addRightColumn() {
            for (var e = adjustLevel(level, 1, 0), t = 0; t < level.width - 1; ++t)
                for (var o = 0; o < level.height; ++o) {
                    var r = t * level.height + o;
                    level.setCell(r, e.getCell(r))
                }
        }

        function addTopRow() {
            for (var e = adjustLevel(level, 0, 1), t = 0; t < level.width; ++t)
                for (var o = 1; o < level.height; ++o) {
                    var r = t * level.height + o;
                    level.setCell(r, e.getCell(r - t - 1))
                }
        }

        function addBottomRow() {
            for (var e = adjustLevel(level, 0, 1), t = 0; t < level.width; ++t)
                for (var o = 0; o < level.height - 1; ++o) {
                    var r = t * level.height + o;
                    level.setCell(r, e.getCell(r - t))
                }
        }

        function removeLeftColumn() {
            if (!(level.width <= 1))
                for (var e = adjustLevel(level, -1, 0), t = 0; t < level.width; ++t)
                    for (var o = 0; o < level.height; ++o) {
                        var r = t * level.height + o;
                        level.setCell(r, e.getCell(r + level.height))
                    }
        }

        function removeRightColumn() {
            if (!(level.width <= 1))
                for (var e = adjustLevel(level, -1, 0), t = 0; t < level.width; ++t)
                    for (var o = 0; o < level.height; ++o) {
                        var r = t * level.height + o;
                        level.setCell(r, e.getCell(r))
                    }
        }

        function removeTopRow() {
            if (!(level.height <= 1))
                for (var e = adjustLevel(level, 0, -1), t = 0; t < level.width; ++t)
                    for (var o = 0; o < level.height; ++o) {
                        var r = t * level.height + o;
                        level.setCell(r, e.getCell(r + t + 1))
                    }
        }

        function removeBottomRow() {
            if (!(level.height <= 1))
                for (var e = adjustLevel(level, 0, -1), t = 0; t < level.width; ++t)
                    for (var o = 0; o < level.height; ++o) {
                        var r = t * level.height + o;
                        level.setCell(r, e.getCell(r + t))
                    }
        }

        function matchGlyph(e, t) {
            for (var o, r = -1, l = 0; l < t.length; ++l) {
                var n = t[l][0],
                    a = t[l][1],
                    i = t[l][2];
                if (a.bitsSetInArray(e.data)) {
                    for (var s = 0, d = 0; d < 32 * STRIDE_OBJ; ++d) i.get(d) && e.get(d) && s++, a.get(d) && e.get(d) && s++;
                    s > r && (r = s, o = n)
                }
            }
            return r > 0 ? o : (logErrorNoLine("Wasn't able to approximate a glyph value for some tiles, using '.' as a placeholder.", !0), ".")
        }

        function printLevel() {
            var e = [];
            for (var t in state.glyphDict)
                if (state.glyphDict.hasOwnProperty(t) && 1 === t.length) {
                    for (var o = state.glyphDict[t], r = new BitVec(STRIDE_OBJ), l = 0; l < o.length; l++) {
                        var n = o[l];
                        n >= 0 && r.ibitset(n)
                    }
                    var a = r.clone(),
                        i = state.layerMasks[state.backgroundlayer];
                    r.iclear(i), e.push([t, r, a])
                }
            selectableint++;
            var s = "selectable" + selectableint,
                d = 'Printing level contents:<br><br><span id="' + s + '" onclick="selectText(\'' + s + "',event)\">";
            cache_console_messages = !1;
            for (var c = 0; c < level.height; c++) {
                for (var l = 0; l < level.width; l++) {
                    var u = c + l * level.height,
                        v = level.getCell(u),
                        o = matchGlyph(v, e);
                    o in htmlEntityMap && (o = htmlEntityMap[o]), d += o
                }
                c < level.height - 1 && (d += "<br>")
            }
            d += "</span><br><br>", consolePrint(d, !0)
        }

        function levelEditorClick(e, t) {
            if (mouseCoordY <= -2) {
                var o = editorRowCount - (-mouseCoordY - 2) - 1,
                    r = mouseCoordX + (screenwidth - 1) * o;
                mouseCoordX === -1 ? printLevel() : mouseCoordX >= 0 && r < glyphImages.length && (glyphSelectedIndex = r, redraw())
            } else if (mouseCoordX > -1 && mouseCoordY > -1 && mouseCoordX < screenwidth - 2 && mouseCoordY < screenheight - 2 - editorRowCount) {
                for (var l = glyphImagesCorrespondance[glyphSelectedIndex], n = state.glyphDict[l], a = new BitVec(STRIDE_OBJ), i = 0; i < n.length; i++) {
                    var s = n[i];
                    s >= 0 && a.ibitset(s)
                }
                var d = state.layerMasks[state.backgroundlayer];
                a.bitsClearInArray(d.data) && a.ibitset(state.backgroundid);
                var c = mouseCoordY + mouseCoordX * level.height,
                    u = level.getCell(c);
                if (u.equals(a)) return;
                anyEditsSinceMouseDown === !1 && (anyEditsSinceMouseDown = !0, backups.push(backupLevel())), level.setCell(c, a), redraw()
            } else t && (mouseCoordX === -1 ? (addLeftColumn(), canvasResize()) : mouseCoordX === screenwidth - 2 && (addRightColumn(), canvasResize()), mouseCoordY === -1 ? (addTopRow(), canvasResize()) : mouseCoordY === screenheight - 2 - editorRowCount && (addBottomRow(), canvasResize()))
        }

        function levelEditorRightClick(e, t) {
            if (mouseCoordY === -2) mouseCoordX <= glyphImages.length && (glyphSelectedIndex = mouseCoordX, redraw());
            else if (mouseCoordX > -1 && mouseCoordY > -1 && mouseCoordX < screenwidth - 2 && mouseCoordY < screenheight - 2 - editorRowCount) {
                var o = mouseCoordY + mouseCoordX * level.height,
                    r = new BitVec(STRIDE_OBJ);
                r.ibitset(state.backgroundid), level.setCell(o, r), redraw()
            } else t && (mouseCoordX === -1 ? (removeLeftColumn(), canvasResize()) : mouseCoordX === screenwidth - 2 && (removeRightColumn(), canvasResize()), mouseCoordY === -1 ? (removeTopRow(), canvasResize()) : mouseCoordY === screenheight - 2 - editorRowCount && (removeBottomRow(), canvasResize()))
        }

        function onMouseDown(e) {
            if (0 !== e.button || e.ctrlKey || e.metaKey) {
                if ((2 === e.button || 0 === e.button && (e.ctrlKey || e.metaKey)) && "gameCanvas" === e.target.id && (dragging = !1, rightdragging = !0, levelEditorOpened)) return levelEditorRightClick(e, !0)
            } else {
                if (lastDownTarget = e.target, keybuffer = [], e.target === canvas && (setMouseCoord(e), dragging = !0, rightdragging = !1, levelEditorOpened)) return anyEditsSinceMouseDown = !1, levelEditorClick(e, !0);
                dragging = !1, rightdragging = !1
            }
        }

        function rightClickCanvas(e) {
            return prevent(e)
        }

        function onMouseUp(e) {
            dragging = !1, rightdragging = !1
        }

        function onKeyDown(e) {
            e = e || window.event;
            trialData.push({"type": e.type, "timeStamp": e.timeStamp, "keyCode": e.keyCode, "key": e.key, "ctrlKey": e.ctrlKey, "metaKey": e.metaKey, "altKey": e.altKey, "shiftKey": e.shiftKey});
             !IDE && [32, 37, 38, 39, 40].indexOf(e.keyCode) > -1 && prevent(e), IDE || 77 !== e.keyCode || toggleMute(), keybuffer.indexOf(e.keyCode) >= 0 || ((lastDownTarget === canvas || window.Mobile && lastDownTarget === window.Mobile.focusIndicator) && keybuffer.indexOf(e.keyCode) === -1 && (keybuffer.splice(keyRepeatIndex, 0, e.keyCode), keyRepeatTimer = 0, checkKey(e, !0)), canDump === !0 && (74 === e.keyCode && (e.ctrlKey || e.metaKey) ? (dumpTestCase(), prevent(e)) : 75 === e.keyCode && (e.ctrlKey || e.metaKey) ? (makeGIF(), prevent(e)) : 83 === e.keyCode && (e.ctrlKey || e.metaKey) && (saveClick(), prevent(e))))
        }

        function relMouseCoords(e) {
            var t = 0,
                o = 0,
                r = 0,
                l = 0,
                n = this;
            do t += n.offsetLeft - n.scrollLeft, o += n.offsetTop - n.scrollTop; while (n = n.offsetParent);
            return r = e.pageX - t, l = e.pageY - o, {
                x: r,
                y: l
            }
        }

        function onKeyUp(e) {
            e = e || window.event;
            trialData.push({"type": e.type, "timeStamp": e.timeStamp, "keyCode": e.keyCode, "key": e.key, "ctrlKey": e.ctrlKey, "metaKey": e.metaKey, "altKey": e.altKey, "shiftKey": e.shiftKey});
            var t = keybuffer.indexOf(e.keyCode);
            t >= 0 && (keybuffer.splice(t, 1), keyRepeatIndex >= t && keyRepeatIndex--)
        }

        function onMyFocus(e) {
            keybuffer = [], keyRepeatIndex = 0, keyRepeatTimer = 0
        }

        function onMyBlur(e) {
            keybuffer = [], keyRepeatIndex = 0, keyRepeatTimer = 0
        }

        function setMouseCoord(e) {
            var t = canvas.relMouseCoords(e);
            mouseCoordX = t.x - xoffset, mouseCoordY = t.y - yoffset, mouseCoordX = Math.floor(mouseCoordX / cellwidth), mouseCoordY = Math.floor(mouseCoordY / cellheight)
        }

        function mouseMove(e) {
            levelEditorOpened && (setMouseCoord(e), dragging ? levelEditorClick(e, !1) : rightdragging && levelEditorRightClick(e, !1), redraw())
        }

        function mouseOut() {}

        function prevent(e) {
            return e.preventDefault && e.preventDefault(), e.stopImmediatePropagation && e.stopImmediatePropagation(), e.stopPropagation && e.stopPropagation(), e.returnValue = !1, !1
        }

        function checkKey(e, t) {
            if (!winning) {
                var o = -1;
                switch (e.keyCode) {
                    case 65:
                    case 37:
                        o = 1;
                        break;
                    case 38:
                    case 87:
                        o = 0;
                        break;
                    case 68:
                    case 39:
                        o = 3;
                        break;
                    case 83:
                    case 40:
                        o = 2;
                        break;
                    case 80:
                        printLevel();
                        break;
                    case 13:
                    case 32:
                    case 67:
                    case 88:
                        if (norepeat_action !== !1 && !t) return;
                        o = 4;
                        break;
                    case 85:
                    case 90:
                        if (textMode === !1) return pushInput("undo"), DoUndo(!1, !0), canvasResize(), prevent(e);
                        break;
                    case 82:
                        if (textMode === !1 && t) return pushInput("restart"), DoRestart(), canvasResize(), prevent(e);
                        break;
                    case 27:
                        if (titleScreen === !1) return goToTitleScreen(), tryPlayTitleSound(), canvasResize(), prevent(e);
                        break;
                    case 69:
                        if (canOpenEditor) return t && (titleScreen && ("EMPTY GAME" === state.title ? compile(["loadFirstNonMessageLevel"]) : nextLevel()), levelEditorOpened = !levelEditorOpened, levelEditorOpened === !1 && printLevel(), restartTarget = backupLevel(), canvasResize()), prevent(e);
                        break;
                    case 48:
                    case 49:
                    case 50:
                    case 51:
                    case 52:
                    case 53:
                    case 54:
                    case 55:
                    case 56:
                    case 57:
                        if (levelEditorOpened && t) {
                            var r = 9;
                            return e.keyCode >= 49 && (r = e.keyCode - 49), r < glyphImages.length ? glyphSelectedIndex = r : consolePrint("Trying to select tile outside of range in level editor.", !0), canvasResize(), prevent(e)
                        }
                }
                if (throttle_movement && o >= 0 && o <= 3) {
                    if (lastinput == o && input_throttle_timer < repeatinterval) return;
                    lastinput = o, input_throttle_timer = 0
                }
                if (textMode) {
                    if (0 === state.levels.length);
                    else if (titleScreen) 0 === titleMode ? 4 === o && t && titleSelected === !1 && (tryPlayStartGameSound(), titleSelected = !0, messageselected = !1, timer = 0, quittingTitleScreen = !0, generateTitleScreen(), canvasResize()) : 4 == o && t ? titleSelected === !1 && (tryPlayStartGameSound(), titleSelected = !0, messageselected = !1, timer = 0, quittingTitleScreen = !0, generateTitleScreen(), redraw()) : 0 !== o && 2 !== o || (0 === o ? titleSelection = 0 : titleSelection = 1, generateTitleScreen(), redraw());
                    else if (4 == o && t) {
                        if (unitTesting) return void nextLevel();
                        messageselected === !1 && (messageselected = !0, timer = 0, quittingMessageScreen = !0, tryPlayCloseMessageSound(), titleScreen = !1, drawMessageScreen())
                    }
                } else if (!againing && o >= 0) return 4 === o && "noaction" in state.metadata || (pushInput(o), processInput(o) && redraw()), prevent(e)
            }
        }

        function countdown() {
            var elapsedSeconds = new Date().getTime() - beginTime;
            var remainingTime = Math.floor(puzzleTimeLimit - elapsedSeconds/1000.) + 1;
            $('.countdown-timer').text(remainingTime);
            if(remainingTime < 0) {
                clearInterval(countdown);
                finishPuzzlePage();
            }
        }

        function update() {
            countdown();
            if (timer += deltatime, input_throttle_timer += deltatime, quittingTitleScreen && timer / 1e3 > .3 && (quittingTitleScreen = !1, nextLevel()), againing && timer > againinterval && 0 == messagetext.length && processInput(-1) && (redraw(), keyRepeatTimer = 0, autotick = 0), quittingMessageScreen && timer / 1e3 > .15 && (quittingMessageScreen = !1, "" === messagetext ? nextLevel() : (messagetext = "", textMode = !1, titleScreen = !1, titleMode = curlevel > 0 || null !== curlevelTarget ? 1 : 0, titleSelected = !1, titleSelection = 0, canvasResize(), checkWin())), winning && timer / 1e3 > .5 && (winning = !1, nextLevel()), keybuffer.length > 0) {
                keyRepeatTimer += deltatime;
                var e = throttle_movement ? repeatinterval : repeatinterval / Math.sqrt(keybuffer.length);
                if (keyRepeatTimer > e) {
                    keyRepeatTimer = 0, keyRepeatIndex = (keyRepeatIndex + 1) % keybuffer.length;
                    var t = keybuffer[keyRepeatIndex];
                    checkKey({
                        keyCode: t
                    }, !1)
                }
            }!(autotickinterval > 0) || textMode || levelEditorOpened || againing || winning || (autotick += deltatime, autotick > autotickinterval && (autotick = 0, pushInput("tick"), processInput(-1) && redraw()))
        }
        var keyRepeatTimer = 0,
            keyRepeatIndex = 0,
            input_throttle_timer = 0,
            lastinput = -100,
            dragging = !1,
            rightdragging = !1,
            columnAdded = !1,
            htmlEntityMap = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
                "/": "&#x2F;"
            },
            selectableint = 0,
            anyEditsSinceMouseDown = !1;
        HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;
        var mouseCoordX = 0,
            mouseCoordY = 0;
        document.addEventListener("mousedown", onMouseDown, !1), document.addEventListener("mouseup", onMouseUp, !1), document.addEventListener("keydown", onKeyDown, !1), document.addEventListener("keyup", onKeyUp, !1), window.addEventListener("focus", onMyFocus, !1), window.addEventListener("blur", onMyBlur, !1), setInterval(function() {
            update()
        }, deltatime);

// DK: countdown remaining time in the level.
    var beginTime = new Date().getTime();

    function Animatable(t, i, e) {
        function n() {
            var t;
            return o += i, o >= 1 && (t = !0, o = 1), e(o), t
        }

        function s() {
            var t;
            return o -= i, o <= 0 && (t = !0, o = 0), e(o), t
        }
        var o, a;
        return a = {
            animateUp: function() {
                Animator.getInstance().animate(t, n)
            },
            animateDown: function() {
                Animator.getInstance().animate(t, s)
            }
        }, o = 0, a
    }
    window.Mobile = {}, Mobile.hasTouch = function() {
        var t;
        return ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch) && (t = !0), t
    }, Mobile.enable = function(t) {
        return (t || Mobile.hasTouch() && !Mobile._instance) && (Mobile._instance = new Mobile.GestureHandler, Mobile._instance.bindEvents(), Mobile._instance.bootstrap()), Mobile._instance
    }, window.Mobile.GestureHandler = function() {
        this.initialize.apply(this, arguments)
    }, Mobile.log = function(t) {
        var i;
        i = document.getElementsByTagName("h1")[0], i.innerHTML = "" + Math.random().toString().substring(4, 1) + "-" + t
    }, Mobile.debugDot = function(t) {
        var i, e, n;
        n = "border-radius: 50px;width: 5px;height: 5px;background: red;position: absolute;left: " + t.touches[0].clientX + "px;top: " + t.touches[0].clientY + "px;", i = document.createElement("div"), i.setAttribute("style", n), e = document.getElementsByTagName("body")[0], e.appendChild(i)
    },
    function(t) {
        "use strict";
        var i = 10,
            e = 50,
            n = 1e3,
            s = 150,
            o = {
                action: 88,
                left: 37,
                right: 39,
                up: 38,
                down: 40,
                undo: 85,
                restart: 82,
                quit: 27
            },
            a = ['<div class="tab">', ' <div class="tab-affordance"></div>', ' <div class="tab-icon">', ' <div class="slice"></div>', ' <div class="slice"></div>', " </div>", "</div>"].join("\n");
        t.initialize = function() {
            this.firstPos = {
                x: 0,
                y: 0
            }, this.setTabAnimationRatio = this.setTabAnimationRatio.bind(this), this.setMenuAnimationRatio = this.setMenuAnimationRatio.bind(this), this.repeatTick = this.repeatTick.bind(this), this.isFocused = !0
        }, t.setFocusElement = function(t) {
            this.focusElement = t, this.isFocused = !1, this.buildFocusIndicator()
        }, t.bindEvents = function() {
            window.addEventListener("touchstart", this.onTouchStart.bind(this)), window.addEventListener("touchend", this.onTouchEnd.bind(this)), window.addEventListener("touchmove", this.onTouchMove.bind(this))
        }, t.bootstrap = function() {
            this.showTab(), this.disableScrolling(), this.isAudioSupported() || this.disableAudio(), this.disableSelection()
        }, t.onTouchStart = function(t) {
            this.isTouching || (this.handleFocusChange(t), this.isFocused && "A" !== t.target.tagName.toUpperCase() && (this.isTouching = !0, this.mayBeSwiping = !0, this.gestured = !1, this.swipeDirection = void 0, this.swipeDistance = 0, this.startTime = (new Date).getTime(), this.firstPos.x = t.touches[0].clientX, this.firstPos.y = t.touches[0].clientY))
        }, t.onTouchEnd = function(t) {
            this.isFocused && this.isTouching && (this.gestured || 0 === t.touches.length && this.handleTap(), 0 === t.touches.length && (this.isTouching = !1, this.endRepeatWatcher()))
        }, t.onTouchMove = function(t) {
            if (this.isFocused) return this.isSuccessfulSwipe() ? (this.handleSwipe(this.swipeDirection, this.touchCount), this.gestured = !0, this.mayBeSwiping = !1, this.beginRepeatWatcher(t)) : this.mayBeSwiping ? this.swipeStep(t) : this.isRepeating && this.repeatStep(t), prevent(t), !1
        }, t.handleFocusChange = function(t) {
            this.focusElement && (this.isFocused = this.isTouchInsideFocusElement(t), this.setFocusIndicatorVisibility(this.isFocused))
        }, t.isTouchInsideFocusElement = function(t) {
            var i;
            return !(!t.touches || !t.touches[0]) && (i = this.absoluteElementPosition(this.focusElement), !(t.touches[0].clientX < i.left || t.touches[0].clientY < i.top) && !(t.touches[0].clientX > i.left + this.focusElement.clientWidth || t.touches[0].clientY > i.top + this.focusElement.clientHeight))
        }, t.setFocusIndicatorVisibility = function(t) {
            var i;
            i = "visible", t || (i = "hidden"), this.focusIndicator.setAttribute("style", "visibility: " + i + ";")
        }, t.absoluteElementPosition = function(t) {
            var i, e;
            for (i = {
                    top: t.offsetTop || 0,
                    left: t.offsetLeft || 0
                }, e = document.getElementsByTagName("body")[0], i.top -= e.scrollTop || 0;;) {
                if (t = t.offsetParent, !t) break;
                i.top += t.offsetTop || 0, i.left += t.offsetLeft || 0
            }
            return i
        }, t.beginRepeatWatcher = function(t) {
            var i;
            this.repeatInterval || (this.isRepeating = !0, i = 1e3 * state.metadata.key_repeat_interval, !isNaN(i) && i || (i = s), this.repeatInterval = setInterval(this.repeatTick, i), this.recenter(t))
        }, t.endRepeatWatcher = function() {
            this.repeatInterval && (clearInterval(this.repeatInterval), delete this.repeatInterval, this.isRepeating = !1)
        }, t.repeatTick = function() {
            this.isTouching && this.handleSwipe(this.direction, this.touchCount)
        }, t.recenter = function(t) {
            this.firstPos.x = t.touches[0].clientX, this.firstPos.y = t.touches[0].clientY
        }, t.isSuccessfulSwipe = function() {
            var t;
            return this.mayBeSwiping && void 0 !== this.swipeDirection && this.swipeDistance >= e && (t = !0), t
        }, t.swipeStep = function(t) {
            var s, o, a, c;
            this.mayBeSwiping && (s = {
                x: t.touches[0].clientX,
                y: t.touches[0].clientY
            }, a = (new Date).getTime(), c = t.touches.length, this.swipeDistance = this.cardinalDistance(this.firstPos, s), this.swipeDirection ? o < e ? (direction = this.dominantDirection(this.firstPos, s), direction !== this.swipeDirection && (this.mayBeSwiping = !1), c < this.touchCount && (this.mayBeSwiping = !1)) : a - this.startTime > n && (this.mayBeSwiping = !1) : this.swipeDistance > i && (this.swipeDirection = this.dominantDirection(this.firstPos, s), this.touchCount = c))
        }, t.repeatStep = function(t) {
            var i, n;
            i = {
                x: t.touches[0].clientX,
                y: t.touches[0].clientY
            }, n = this.cardinalDistance(this.firstPos, i), n >= e && (this.swipeDirection = this.dominantDirection(this.firstPos, i), this.recenter(t))
        }, t.cardinalDistance = function(t, i) {
            var e, n;
            return e = Math.abs(t.x - i.x), n = Math.abs(t.y - i.y), Math.max(e, n)
        }, t.dominantDirection = function(t, i) {
            var e, n, s, o;
            return e = i.x - t.x, n = i.y - t.y, s = "x", Math.abs(n) > Math.abs(e) && (s = "y"), o = "x" === s ? e > 0 ? "right" : "left" : n > 0 ? "down" : "up"
        }, t.handleSwipe = function(t, i) {
            1 === i ? this.emitKeydown(this.swipeDirection) : i > 1 && this.toggleMenu()
        }, t.handleTap = function() {
            this.emitKeydown("action")
        }, t.emitKeydown = function(t) {
            var i;
            i = {
                keyCode: o[t]
            }, this.fakeCanvasFocus(), onKeyDown(i), onKeyUp(i)
        }, t.fakeCanvasFocus = function() {
            var t;
            t = document.getElementById("gameCanvas"), onMouseDown({
                button: 0,
                target: t
            })
        }, t.toggleMenu = function() {
            this.isMenuVisible ? this.hideMenu() : this.showMenu()
        }, t.showMenu = function() {
            this.menuElem || this.buildMenu(), this.getAnimatables().menu.animateUp(), this.isMenuVisible = !0, this.hideTab()
        }, t.hideMenu = function() {
            this.menuElem && this.getAnimatables().menu.animateDown(), this.isMenuVisible = !1, this.showTab()
        }, t.getAnimatables = function() {
            var t = this;
            return this._animatables || (this._animatables = {
                tab: Animatable("tab", .1, t.setTabAnimationRatio),
                menu: Animatable("menu", .1, t.setMenuAnimationRatio)
            }), this._animatables
        }, t.showTab = function() {
            this.tabElem || this.buildTab(), this.getAnimatables().tab.animateDown()
        }, t.hideTab = function() {
            this.tabElem && this.tabElem.setAttribute("style", "display: none;"), this.getAnimatables().tab.animateUp()
        }, t.buildTab = function() {
            var t, i, e, n, s = this;
            t = document.createElement("div"), t.innerHTML = a, n = t.children[0], e = function(t) {
                t.stopPropagation(), s.showMenu()
            }, this.tabAffordance = n.getElementsByClassName("tab-affordance")[0], this.tabElem = n.getElementsByClassName("tab-icon")[0], this.tabAffordance.addEventListener("touchstart", e), this.tabElem.addEventListener("touchstart", e), i = document.getElementsByTagName("body")[0], i.appendChild(n)
        }, t.buildMenu = function() {
            var t, i, e, n, s, o, a, c = this;
            t = document.createElement("div"), t.innerHTML = this.buildMenuString(state), this.menuElem = t.children[0], this.closeElem = this.menuElem.getElementsByClassName("close")[0], a = function(t) {
                t.stopPropagation(), c.hideMenu()
            }, this.closeAffordance = this.menuElem.getElementsByClassName("close-affordance")[0], o = this.menuElem.getElementsByClassName("close")[0], this.closeAffordance.addEventListener("touchstart", a), o.addEventListener("touchstart", a), e = this.menuElem.getElementsByClassName("undo")[0], e && e.addEventListener("touchstart", function(t) {
                t.stopPropagation(), c.emitKeydown("undo")
            }), n = this.menuElem.getElementsByClassName("restart")[0], n && n.addEventListener("touchstart", function(t) {
                t.stopPropagation(), c.emitKeydown("restart")
            }), s = this.menuElem.getElementsByClassName("quit")[0], s.addEventListener("touchstart", function(t) {
                t.stopPropagation(), c.emitKeydown("quit")
            }), i = document.getElementsByTagName("body")[0], i.appendChild(this.menuElem)
        }, t.buildMenuString = function(t) {
            var i, e, n, s;
            return n = t.metadata.noundo, s = t.metadata.norestart, i = 3, n && (i -= 1), s && (i -= 1), e = ['<div class="mobile-menu item-count-' + i + '">', ' <div class="close-affordance"></div>', ' <div class="close">', ' <div class="slice"></div>', ' <div class="slice"></div>', " </div>"], n || e.push(' <div class="undo button">Undo</div>'), s || e.push(' <div class="restart button">Restart</div>'), e = e.concat([' <div class="quit button">Quit to Menu</div>', ' <div class="clear"></div>', "</div>"]), e.join("\n")
        }, t.buildFocusIndicator = function() {
            var t;
            this.focusIndicator = document.createElement("DIV"), this.focusIndicator.setAttribute("class", "tapFocusIndicator"), this.focusIndicator.setAttribute("style", "visibility: hidden;"), t = this.focusElement.parentNode, t.appendChild(this.focusIndicator)
        }, t.setTabAnimationRatio = function(t) {
            var i, e, n, s = 18,
                o = 66;
            t = Math.round(1e3 * t) / 1e3, t >= .999 ? this.tabAffordance.setAttribute("style", "display: none;") : this.tabAffordance.setAttribute("style", "display: block;"), i = o * t + s * (1 - t), e = "opacity: " + (1 - t) + ";", n = e + " width: " + i + "px;", this.tabElem.setAttribute("style", n)
        }, t.setMenuAnimationRatio = function(t) {
            var i, e, n, s = -66,
                o = -18;
            t = Math.round(1e3 * t) / 1e3, t <= .001 ? this.closeAffordance.setAttribute("style", "display: none;") : this.closeAffordance.setAttribute("style", "display: block;"), i = o * t + s * (1 - t), e = "opacity: " + t + ";", n = "left: " + (i - 4) + "px; " + e + " width: " + -i + "px;", this.closeElem.setAttribute("style", n), this.menuElem.setAttribute("style", e)
        }, t.disableScrolling = function() {
            var t = {
                    height: "100%",
                    overflow: "hidden",
                    position: "fixed",
                    width: "100%"
                },
                i = "";
            for (var e in t) i += e + ": " + t[e] + "; ";
            document.body.setAttribute("style", i)
        }, t.disableAudio = function() {
            window.playSeed = function() {}
        }, t.isAudioSupported = function() {
            var t = !0;
            return "undefined" != typeof webkitAudioContext && (t = !1), t
        }, t.disableSelection = function() {
            var t;
            t = document.getElementsByTagName("body")[0], t.setAttribute("class", t.getAttribute("class") + " disable-select")
        }
    }(window.Mobile.GestureHandler.prototype), window.Animator = function() {
        this.initialize.apply(this, arguments)
    },
    function(t) {
        t.initialize = function() {
            this._animations = {}, this.tick = this.tick.bind(this)
        }, t.animate = function(t, i) {
            this._animations[t] = i, this.wakeup()
        }, t.wakeup = function() {
            this._isAnimating || (this._isAnimating = !0, this.tick())
        }, t.tick = function() {
            var t, i, e, n, s;
            n = [], e = !0;
            for (t in this._animations) {
                if (!this._animations.hasOwnProperty(t)) return;
                i = this._animations[t](), i ? n.push(t) : e = !1
            }
            if (e) {
                for (s = 0; s < n.length; n++) delete this._isAnimating[n[s]];
                this._isAnimating = !1
            } else requestAnimationFrame(this.tick)
        }
    }(window.Animator.prototype), window.Animator.getInstance = function() {
        return window.Animator._instance || (window.Animator._instance = new window.Animator), window.Animator._instance
    },
    function() {
        "use strict";
        var t, i, e = ["ms", "moz", "webkit", "o"];
        for (t = 0; t < e.length && !window.requestAnimationFrame; t++) window.requestAnimationFrame = window[e[t] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[t] + "CancelAnimationFrame"], window.cancelAnimationFrame || (window.cancelAnimationFrame = window[e[t] + "CancelRequestAnimationFrame"]);
        window.requestAnimationFrame || (i = 0, window.requestAnimationFrame = function(t, e) {
            var n, s, o;
            return n = (new Date).getTime(), s = Math.max(0, 16 - (n - i)), o = window.setTimeout(function() {
                t(n + s)
            }, s), i = n + s, o
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(t) {
            clearTimeout(t)
        }), Mobile.enable()
    }();
    

    /* CURRENT LEVEL */
    //"title MacGyver - Go to green square\nauthor Vasanth\nhomepage www.puzzlescript.net\n\n========\nOBJECTS\n========\n\nBackground \nBlack\n\nTarget \nblack \n\nWall \ngrey darkgray\n01110\n10001\n10001\n10001\n01110\n\nPlayerNormal\nBlack Orange White Blue\n.000.\n.111.\n22222\n.333.\n.3.3.\n\nPlayerKey\nBlack Orange White Blue red\n.000.\n.111.\n22224\n.333.\n.3.3.\n\nPlayerBomb\nBlack Orange White Blue darkgrey\n.000.\n.111.\n22224\n.333.\n.3.3.\n\nPlayerWater\nBlack Orange White Blue lightblue\n.000.\n.111.\n22224\n.333.\n.3.3.\n\nCrateNormal \nOrange brown\n01110\n10001\n10001\n10001\n01110\n\nCrateKey\nOrange brown\n01110\n10001\n10001\n10001\n01110\n\n\nDoorClosed\nblack lightgray green\n10000\n10222\n10202\n10222\n10000\n\nKey\nblack red\n00100\n01100\n00100\n01100\n01100\n\nGate\nblack lightred\n00100\n00100\n00100\n00100\n00100\n\nButton\nblack yellow\n00100\n00100\n11111\n00100\n00100\n\nBomb\nblack white yellow darkgray\n22100\n22010\n00333\n00333\n00333\n\nFire\nblack red orange yellow\n00000\n00100\n01210\n01321\n12321\n\nWater\nblack blue lightblue\n00100\n00100\n01110\n11121\n01110\n\n=======\nLEGEND\n=======\n\nPlayer = PlayerNormal or PlayerKey or PlayerBomb or PlayerWater\nCrate = CrateNormal or CrateKey\n\n. = Background\n# = Wall\nP = PlayerNormal\nQ = PlayerKey\n* = CrateNormal\nK = CrateKey\n@ = DoorClosed and Target\nT = Target\n! = Key\nD = DoorClosed \nG = Gate\nB = Button\nX = Bomb\nF = Fire\nW = Water\n\n\n\n=======\nSOUNDS\n=======\n\n================\nCOLLISIONLAYERS\n================\n\nBackground\nTarget, Key, Button, Bomb, Water\nPlayerNormal, PlayerKey, PlayerBomb, PlayerWater, Fire, Wall, Crate, CrateKey, DoorClosed, Gate\n\n======\nRULES     \n======     \n\n[> PlayerBomb | CrateKey ] -> [PlayerNormal | Key]\n[> PlayerBomb | CrateNormal] -> [PlayerNormal | ]\n[> PlayerWater | Fire ] -> [ PlayerNormal | ]\n[> Player | Crate ] -> [> Player | > Crate ]\n[> Player | Fire ] -> [| Fire]\n[> CrateKey | Fire ] -> [ | Fire Key]\n[> CrateNormal | Fire] -> [ | Fire]\n[> PlayerKey | DoorClosed] -> [> PlayerNormal | ]\nlate [Crate Button][Gate] -> [Crate Button][]\nlate [PlayerNormal Key] -> [ PlayerKey]\nlate [PlayerNormal Bomb] -> [PlayerBomb]\nlate [PlayerNormal Water] -> [PlayerWater]\n\n\n==============\nWINCONDITIONS\n==============\n\nAll Target on Player    \n\n=======     \nLEVELS\n=======\n\n############\n#..........@\n#.W...p....#\n#..........#\n#..........#\n#.F....K...#\n#..........#\n#..........#\n############\n\n############\n#..........@\n#.....p....#\n#..........#\n#..........#\n#.X....K...#\n#..........#\n#..........#\n############\n\n\n############\n#..........@\n#.....p....#\n#..........#\n#..........#\n#..........#\n#.!........#\n#..........#\n############\n\n############\n#..........@\n#*....p....#\n#B#........#\n#......*...#\n#####......#\n#...G......#\n#.!.G......#\n############\n\n\n\n\n\n\n\n\n\n\n\n\n";
    compile(["restart"], levelSourceCode);

    nextLevel();
};